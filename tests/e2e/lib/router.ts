import { BASE_PATH, PATH_AUTH, PATH_USER } from '../utils';

export default {
  auth: {
    login: `/${BASE_PATH}/${PATH_AUTH}/login`,
    logout: `/${BASE_PATH}/${PATH_AUTH}/logout`,
    forgotPassword: `/${BASE_PATH}/${PATH_AUTH}/forgot-password`,
    resetPassword: `/${BASE_PATH}/${PATH_AUTH}/reset-password`,
    refreshToken: `/${BASE_PATH}/${PATH_AUTH}/refresh-token`,
  },
  users: {
    getCurrent: `/${BASE_PATH}/${PATH_USER}/current`,
    updateCurrent: `/${BASE_PATH}/${PATH_USER}/current`,
    create: `/${BASE_PATH}/${PATH_USER}`,
    resetPassword: `/${BASE_PATH}/${PATH_USER}/reset-password`,
  },
};
