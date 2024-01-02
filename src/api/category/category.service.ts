import { ObjectId } from "mongodb";
import { getCollection } from "../../services/db.service";
import { loggerService } from "../../services/logger.service";

export async function categoriesQuery(filterBy: { [key: string]: any }) {
  try {
    const collection = await getCollection("gallery_category");
    const criteria = _buildCriteria(filterBy);
    var categories = await collection?.find(criteria).toArray();
    return categories;
  } catch (err) {
    loggerService.error("cannot find categories", err);
    throw err;
  }
}

function _buildCriteria(filterBy: { [key: string]: any }) {
  const criteria: { [key: string]: any } = {};
  if (filterBy.id) {
    criteria._id = new ObjectId(filterBy.id);
    delete filterBy.id;
  }
  return criteria;
}
