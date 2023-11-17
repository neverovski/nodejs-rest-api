export enum UserInject {
  CONTROLLER = 'UserController',
  REPOSITORY = 'UserRepository',
  SCHEMA = 'UserSchema',
  SERVICE = 'UserService',
  SERVICE_VALIDATOR = 'UserValidatorService',
}

export enum UserRouterLink {
  USER = '/',
  USER_CURRENT = '/current',
  USER_CURRENT_PASSWORD = '/current/change-password',
}
