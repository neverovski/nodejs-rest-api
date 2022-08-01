import { compareSync, hash } from 'bcrypt';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { SALT_PASSWORD_ROUNDS } from '@utils';

import { UserEntity } from '../entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  beforeInsert({ entity }: InsertEvent<UserEntity>): Promise<void> {
    return this.hashPassword(entity);
  }

  //FIXME: refactoring
  async beforeUpdate({
    entity,
    databaseEntity,
  }: UpdateEvent<UserEntity>): Promise<void> {
    if (entity?.password && databaseEntity?.password) {
      if (
        entity?.password !== databaseEntity?.password &&
        !compareSync(entity.password as string, databaseEntity.password)
      ) {
        await this.hashPassword(entity as UserEntity);
        entity.confirmTokenPassword = '';
      } else {
        entity.password = databaseEntity.password;
      }
    } else if (entity?.password) {
      await this.hashPassword(entity as UserEntity);
      entity.confirmTokenPassword = '';
    }
  }

  listenTo() {
    return UserEntity;
  }

  private async hashPassword(entity: UserEntity): Promise<void> {
    if (entity?.password) {
      entity.password = await hash(entity.password, SALT_PASSWORD_ROUNDS);
    }
  }
}
