import type { Response as ExpressResponse } from 'express';

import {
  CreateUserRequest,
  DeleteUserRequest,
  UpdateUserRequest,
  UserPasswordChangeRequest,
  UserRequest,
} from '../types';

export interface IUserController {
  changePasswordCurrentUser(
    req: UserPasswordChangeRequest,
    res: ExpressResponse,
  ): Promise<void>;
  create(req: CreateUserRequest, res: ExpressResponse): Promise<void>;
  deleteCurrentUser(
    req: DeleteUserRequest,
    res: ExpressResponse,
  ): Promise<void>;
  getCurrentUser(req: UserRequest, res: ExpressResponse): Promise<void>;
  updateCurrentUser(
    req: UpdateUserRequest,
    res: ExpressResponse,
  ): Promise<void>;
}
