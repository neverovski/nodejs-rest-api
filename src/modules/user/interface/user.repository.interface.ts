import { FullUser, User, UserOption } from '../user.type';

export interface IUserRepository {
  create(body: User): Promise<Id>;
  delete(query: Partial<FullUser>): Promise<void>;
  findOne(options: UserOption): Promise<FullUser | null>;
  findOneOrFail(options: UserOption): Promise<FullUser>;
  save(entity: Partial<FullUser>, partialEntity: Partial<User>): Promise<void>;
  update(
    entity: Partial<FullUser>,
    partialEntity: Partial<User>,
  ): Promise<void>;
}
