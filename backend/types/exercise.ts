import { ObjectId } from "mongodb";

type Exercise = {
  imgSrc: string;
  parentCategoryId: number;
  parentProjectId: number;
  isProjectInitState: boolean;
  _id: ObjectId;
};

export default Exercise;
