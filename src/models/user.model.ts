export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  articles: Array<string>;
}
