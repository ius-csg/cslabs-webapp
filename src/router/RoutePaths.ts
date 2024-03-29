
export enum RoutePaths {
  login = '/login',
  loginWithRedirect = '/login/?redirectTo=:redirect',
  profile = '/profile',
  explore = '/explore',
  module = '/module/:id/',
  myModules = '/my-modules',
  NewModule = '/module-editor',
  EditModule = '/module-editor/:moduleId',
  EditLab = '/module-editor/:moduleId/lab/:labId',
  NewLab = '/module-editor/:moduleId/lab',
  resetEmail = '/resetemail',
  resetPassword = '/resetpassword',
  forgotPassword = '/forgotpassword',
  confirmForgotPassword = '/confirm-forgot-password/:passwordRecoveryCode',
  logout = '/logout',
  contactUs = '/contact',
  home = '/',
  userModule = '/user-module/:id',
  userLab = '/user-lab/:id',
  verifyEmail = '/verify-email/:code',
  sitePolicy = '/policy',
  contentCreator = '/content-creator',
  adminPanel = '/admin-panel',
  emailVerification = '/emailverification',
  unsubscribeNewsletter = '/unsubscribe-newsletter',
  newsletterStatus = '/newsletter-status'
}
