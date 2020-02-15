
export enum RoutePaths {
  login = '/login',
  profile = '/profile',
  explore = '/explore',
  module = '/module/:id/',
  myModules = '/my-modules',
  resetEmail = '/resetemail',
  resetPassword = '/resetpassword',
  forgotPassword = '/forgotpassword',
  confirmForgotPassword = '/confirm-forgot-password/:passwordRecoveryCode',
  logout = '/logout',
  home = '/',
  userModule = '/user-module/:id',
  userLab = '/user-lab/:id',
  verifyEmail = '/verify-email/:type/:code',
  sitePolicy = '/policy'
}
