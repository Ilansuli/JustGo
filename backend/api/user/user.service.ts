import { Document, ObjectId, WithId } from "mongodb";
import { getCollection } from "../../services/db.service";
import { loggerService } from "../../services/logger.service";
import { User } from "../../types";

export async function usersQuery(
  filterBy: { [key: string]: any },
  sortBy: { [key: string]: any } = { name: 1 }
) {
  try {
    const collection = await getCollection("user");
    const criteria = _buildCriteria(filterBy);
    var users = await collection?.find(criteria).sort(sortBy).toArray();
    if (filterBy.pageParam && filterBy.limit) {
      return await _getPage(filterBy.pageParam, filterBy.limit, users);
    }
    return users;
  } catch (err) {
    loggerService.error("cannot find users", err);
    throw err;
  }
}

function _buildCriteria(filterBy: { [key: string]: any }) {
  const criteria: { [key: string]: any } = {};
  if (filterBy.projectId) {
    criteria["parentProjectId"] = new ObjectId(filterBy.projectId);
    delete filterBy.projectId;
  }
  if (filterBy.query) {
    criteria["name"] = { $regex: filterBy.query, $options: "i" };
    delete filterBy.query;
  }
  if (filterBy.muscles.length > 0) {
    criteria["target"] = { $in: filterBy.muscles };
  }
  if (filterBy.equipments.length > 0) {
    criteria["equipment"] = { $in: filterBy.equipments };
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
    data: User[] | WithId<Document>[];
    nextId: number | null;
    previousId: number | null;
  } = { data: [], nextId: 0, previousId: 0 };

  page.nextId = endIdx < data.length ? pageParam + 1 : null;
  page.previousId = startIdx > 0 ? pageParam - 1 : null;
  page.data = data.slice(startIdx, endIdx);
  return page;
}

export async function getById(userId) {
  try {
    const collection = await getCollection("user");
    const user = collection.findOne({ _id: new ObjectId(userId) });
    return user;
  } catch (err) {
    loggerService.error(`while finding user ${userId}`, err);
    throw err;
  }
}
