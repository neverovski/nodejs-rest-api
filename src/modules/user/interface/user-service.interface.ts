import { IHttpException } from '@utils/index';

import { UserDTO } from '../dto';
import { User, FullUser } from '../user.type';

export interface IUserService {
  getOne(query: Partial<FullUser>): Promise<ResponseData<UserDTO>>;
  create(body: User): Promise<IHttpException>;
}
