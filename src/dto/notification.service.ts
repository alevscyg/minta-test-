export interface NotificationService<TIn = string> {
  sendWelcomeMessage(account: TIn)
}
