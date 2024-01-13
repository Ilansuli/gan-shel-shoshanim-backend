import { Document, ObjectId, WithId } from "mongodb";
import { getCollection } from "../../services/db.service";
import { loggerService } from "../../services/logger.service";
import { TGalleryImg } from "../../types/galleryImg";

export async function galleryImgsQuery(filterBy: { [key: string]: any }) {
  try {
    const collection = await getCollection("gallery_img");
    const criteria = _buildCriteria(filterBy);
    var galleryImgs = await collection?.find(criteria).toArray();
    if (filterBy.pageParam && filterBy.limit) {
      return await _getPage(filterBy.pageParam, filterBy.limit, galleryImgs);
    }
    return galleryImgs;
  } catch (err) {
    loggerService.error("cannot find galleryImgs", err);
    throw err;
  }
}

function _buildCriteria(filterBy: { [key: string]: any }) {
  const criteria: { [key: string]: any } = {};
  if (filterBy.categoryId) {
    criteria["parentCategoriesIds"] = {
      $in: [new ObjectId(filterBy.categoryId)],
    };
    delete filterBy.categoryId;
  }
  if (filterBy.projectId) {
    criteria["parentProjectId"] = new ObjectId(filterBy.projectId);
    delete filterBy.projectId;
  }
  return criteria;
}

async function _getPage(
  pageParam: number,
  limit: number,
  data: WithId<Document>[]
) {
  const startIdx = (pageParam - 1) * limit;
  const endIdx = pageParam * limit;

  const page: {
    data: TGalleryImg[] | WithId<Document>[];
    nextId: number | null;
    previousId: number | null;
  } = { data: [], nextId: 0, previousId: 0 };

  page.nextId = endIdx < data.length ? pageParam + 1 : null;
  page.previousId = startIdx > 0 ? pageParam - 1 : null;
  page.data = data.slice(startIdx, endIdx);
  return page;
}
