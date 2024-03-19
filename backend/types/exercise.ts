import { ObjectId } from "mongodb";

export type Exercise = {
  imgSrc: string;
  parentCategoryId: number;
  parentProjectId: number;
  isProjectInitState: boolean;
  _id: ObjectId;
};
