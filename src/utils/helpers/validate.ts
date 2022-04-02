import { compareSync } from 'bcrypt';

export default (() => {
  const credentials = (password?: string, oldPassword?: string) => {
    return oldPassword && password ? compareSync(password, oldPassword) : false;
  };

  return { credentials };
})();
