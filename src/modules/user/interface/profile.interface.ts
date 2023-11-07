import { IBase } from '@common/interfaces';

export interface IProfile extends IBase {
  firstName?: string;
  lastName?: string;
  userId: number;
}
