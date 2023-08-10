import { Post } from './post';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  posts: Post[];
}
