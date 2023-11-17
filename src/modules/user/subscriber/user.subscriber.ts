import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

import { HashUtil } from '@common/utils';

import { UserEntity } from '../entity/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
  async beforeInsert({ entity }: InsertEvent<UserEntity>) {
    if (entity?.password) {
      entity.password = (await HashUtil.hashPassword(entity.password)) || '';
    }

    if (entity?.email) {
      entity.email = entity.email.toLowerCase();
    }
  }

  async beforeUpdate({ entity }: UpdateEvent<UserEntity>): Promise<void> {
    if (entity?.password) {
      entity.password = await HashUtil.hashPassword(entity.password as string);
    }
  }

  listenTo() {
    return UserEntity;
  }
}
