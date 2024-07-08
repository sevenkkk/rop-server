import { Pagination } from '@/src/share/model';

export class UserListBody extends Pagination {
  constructor() {
    super();
  }
  username: string;
}
