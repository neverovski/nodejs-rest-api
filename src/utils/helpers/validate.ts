import { compareSync } from 'bcrypt';

export const credentials = (password?: string, oldPassword?: string) =>
  oldPassword && password ? compareSync(password, oldPassword) : false;
