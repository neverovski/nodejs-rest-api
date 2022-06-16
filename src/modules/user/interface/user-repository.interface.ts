import { User, FullUser, UserOption } from '../user.type';

export interface IUserRepository {
  create(body: User): Promise<Id>;
  findOne(options: UserOption): Promise<FullUser | null>;
  findOneOrFail(options: UserOption): Promise<FullUser>;
  update(entity: Partial<FullUser>, body: Partial<User>): Promise<void>;
}
