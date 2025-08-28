export default abstract class UseCase<Repository> {
  protected repository: Repository

  constructor(repository: Repository) {
    if (!repository) throw new Error('Repository is required')

    this.repository = repository
  }

  protected async handleResponse<T>(
    promise: Promise<{ data: T | null; error: string | null }>
  ): Promise<T> {
    const { error, ...response } = await promise

    if (error) throw new Error(error)

    return response.data as T
  }
}
