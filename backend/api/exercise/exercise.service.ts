import { Document, ObjectId, WithId } from "mongodb";
import { getCollection } from "../../services/db.service";
import { loggerService } from "../../services/logger.service";
import { Exercise } from "../../types/exercise";

export async function exercisesQuery(
  filterBy: { [key: string]: any },
  sortBy: { [key: string]: any } = { name: 1 }
) {
  try {
    const collection = await getCollection("exercise");
    const criteria = _buildCriteria(filterBy);
    var exercises = await collection?.find(criteria).sort(sortBy).toArray();
    if (filterBy.pageParam && filterBy.limit) {
      return await _getPage(filterBy.pageParam, filterBy.limit, exercises);
    }
    return exercises;
  } catch (err) {
    loggerService.error("cannot find exercises", err);
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
    data: Exercise[] | WithId<Document>[];
    nextId: number | null;
    previousId: number | null;
  } = { data: [], nextId: 0, previousId: 0 };

  page.nextId = endIdx < data.length ? pageParam + 1 : null;
  page.previousId = startIdx > 0 ? pageParam - 1 : null;
  page.data = data.slice(startIdx, endIdx);
  return page;
}

export async function getById(exerciseId) {
  try {
    const collection = await getCollection("exercise");
    const exercise = collection.findOne({ _id: new ObjectId(exerciseId) });
    return exercise;
  } catch (err) {
    loggerService.error(`while finding exercise ${exerciseId}`, err);
    throw err;
  }
}
