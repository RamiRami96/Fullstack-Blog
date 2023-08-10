import { User } from './user';

export interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  user: User;
  userId: number;
}
