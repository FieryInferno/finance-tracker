export default interface Repository {
  get?(params?: Record<string, string>): any
}