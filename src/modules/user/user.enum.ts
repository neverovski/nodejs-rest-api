export enum UserInject {
  CONTROLLER = 'UserController',
  PROFILE_REPOSITORY = 'UserProfileRepository',
  REPOSITORY = 'UserRepository',
  SCHEMA = 'UserSchema',
  SERVICE = 'UserService',
  VALIDATOR_SERVICE = 'UserValidatorService',
}

export enum UserRouterLink {
  USER = '/',
  USER_CURRENT = '/current',
  USER_CURRENT_PASSWORD = '/current/change-password',
}
