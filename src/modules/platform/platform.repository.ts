import { RepositoryCore } from '@core';
import { FullUser } from '@modules/user';
import { DB_TABLE_PROFILE, DB_TABLE_USER, PlatformPayload } from '@utils';

import { PlatformEntity } from './entity';
import { IPlatformRepository } from './interface';

export default class PlatformRepository
  extends RepositoryCore<PlatformEntity>
  implements IPlatformRepository
{
  constructor() {
    super(PlatformEntity, 'platform');
  }

  async create({
    name,
    ssid,
    url,
    profile,
    email,
  }: PlatformPayload): Promise<{ userId: number }> {
    try {
      return await this.orm.manager.transaction(async (manager) => {
        const queryRaw = `
                WITH u AS(
                    INSERT INTO ${DB_TABLE_USER} ("email", "isConfirmedEmail")
                        VALUES ($1, $2) ON CONFLICT("email") DO NOTHING RETURNING "id"
                )
                SELECT "id" FROM u
                UNION
                SELECT "id" FROM ${DB_TABLE_USER} WHERE email = $1`;

        const { id: userId } = await manager
          .query(queryRaw, [email || null, true])
          .then((res: FullUser[]) => res[0] as FullUser);

        if (profile && Object.keys(profile).length) {
          await manager
            .createQueryBuilder()
            .insert()
            .into(DB_TABLE_PROFILE)
            .values({ ...profile, userId })
            .onConflict('("userId") DO NOTHING')
            .execute();
        }

        await manager
          .createQueryBuilder()
          .insert()
          .into(PlatformEntity)
          .values({ name, ssid, url, userId })
          .execute();

        return { userId };
      });
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
