import { compareSync } from 'bcrypt';

export const credentials = (password?: string, oldPassword?: string) => {
  return oldPassword && password ? compareSync(password, oldPassword) : false;
};
