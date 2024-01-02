import { ObjectId } from "mongodb";
import { getCollection } from "../../services/db.service";
import { loggerService } from "../../services/logger.service";

export async function projectsQuery(filterBy: { [key: string]: any }) {
  try {
    const collection = await getCollection("project");
    const criteria = _buildCriteria(filterBy);
    var projects = await collection?.find(criteria).toArray();
    return projects;
  } catch (err) {
    loggerService.error("cannot find projects", err);
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
