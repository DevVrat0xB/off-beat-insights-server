import { ContentType } from './contentType.model';

export interface Content {
  type: ContentType;
  data: Array<String>;
}
