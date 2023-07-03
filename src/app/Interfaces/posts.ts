import { User } from './user';

export interface Post {
  id: number;
  title: string;
  text: string;
  createdDate: Date;
  publishedDate: Date;
  author?: User;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  author: User;
  message: string;
  createdDate: Date;
}
