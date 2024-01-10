export enum AuthInject {
  CONTROLLER = 'AuthController',
  SCHEMA = 'AuthSchema',
  SERVICE = 'AuthService',
  TOKEN_SERVICE = 'AuthTokenService',
}

export enum AuthRouterLink {
  EMAIL_VERIFY = '/email/verify',
  EMAIL_VERIFY_CODE = '/email/verify/:code',
  FORGOT_PASSWORD_EMAIL = '/forgot-password/email',
  FORGOT_PASSWORD_EMAIL_RESET = '/forgot-password/email/reset',
  LOGIN = '/login',
  LOGOUT = '/logout',
  PLATFORM = '/platform',
  REFRESH_TOKEN = '/refresh-token',
}
