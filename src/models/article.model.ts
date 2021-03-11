import { ObjectId } from "mongodb";
import { Chapter } from "./chapter.model";

export interface Article {
  _id: ObjectId;
  title: string;
  summary: string;
  chapters: Chapter[];
  created: Date;
  updated: Date;
  author: string;
  isPublished: boolean;
  approved: boolean;
}
