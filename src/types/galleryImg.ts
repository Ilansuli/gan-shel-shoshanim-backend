import { ObjectId } from "mongodb";

export type TGalleryImg = {
  imgSrc: string;
  parentCategoryId: number;
  parentProjectId: number;
  isProjectInitState: boolean;
  _id: ObjectId;
};
