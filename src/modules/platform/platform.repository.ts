import { RepositoryCore } from '@core';
import { DB_TABLE_PROFILE, DB_TABLE_USER } from '@utils';

import { PlatformEntity } from './entity';
import { IPlatformRepository } from './interface';
import { PLATFORM_RELATION } from './platform.constant';
import { PlatformProvider } from './platform.type';

export default class PlatformRepository
  extends RepositoryCore<PlatformEntity>
  implements IPlatformRepository
{
  constructor() {
    super(PlatformEntity, 'p');
  }

  async create({
    name,
    ssid,
    url,
    profile,
    ...user
  }: PlatformProvider): Promise<Id> {
    try {
      return await this.orm.manager.transaction(async (manager) => {
        const platformFromDB = await manager.findOne(PlatformEntity, {
          where: { name, ssid },
          relations: PLATFORM_RELATION,
        });

        if (platformFromDB) {
          return {
            id: platformFromDB.userId,
            email: platformFromDB.user?.email,
          };
        }

        const updatedAt = new Date();
        const userId = await manager
          .createQueryBuilder()
          .insert()
          .into(DB_TABLE_USER)
          .values(user)
          .onConflict('("email") DO UPDATE SET "updatedAt" = :updatedAt')
          .setParameters({ updatedAt })
          .returning(['id'])
          .execute()
          .then((res) => (res?.generatedMaps[0] as Id)?.id);

        if (profile && Object.keys(profile).length) {
          await manager
            .createQueryBuilder()
            .insert()
            .into(DB_TABLE_PROFILE)
            .values({ ...profile, userId })
            .onConflict('("userId") DO UPDATE SET "updatedAt" = :updatedAt')
            .setParameters({ updatedAt })
            .execute();
        }

        await manager
          .createQueryBuilder()
          .insert()
          .into(PlatformEntity)
          .values({ name, ssid, url, userId })
          .execute();

        return { id: userId, email: user?.email };
      });
    } catch (err) {
      throw this.errorHandler(err);
    }
  }
}
