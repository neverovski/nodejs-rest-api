import { IHttpException } from '@utils/index';

import { User } from '../user.type';

export interface IUserService {
  create(body: User): Promise<IHttpException>;
}
