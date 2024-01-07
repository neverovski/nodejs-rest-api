export enum AuthInject {
  CONTROLLER = 'AuthController',
  SCHEMA = 'AuthSchema',
  SERVICE = 'AuthService',
  TOKEN_SERVICE = 'AuthTokenService',
}

export enum AuthRouterLink {
  LOGIN = '/login',
  LOGOUT = '/logout',
  PASSWORD_EMAIL = '/password/email',
  PASSWORD_RESET_EMAIL = '/password/reset/email',
  PLATFORM = '/platform',
  REFRESH_TOKEN = '/refresh-token',
}
