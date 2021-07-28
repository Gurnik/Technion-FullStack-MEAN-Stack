import { UserPost } from 'src/app/user-post';
import { UserTask } from 'src/app/user-task';

export class User {
  constructor(
    public _id?: string,
    public name?: string,
    public email?: string,
    public street?: string,
    public city?: string,
    public zipcode?: number,
    public tasks?: UserTask[],
    public posts?: UserPost[]
  ) {}
}
