import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  role: string;
  password: string;
  articles: Array<string>;
}
