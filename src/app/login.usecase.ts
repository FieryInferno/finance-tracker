import UserRepositoryInterface from '@/app/user.repository.interface'
import { User } from '@/app/types'
import AuthError from '@/app/auth.error'

/**
 * Use case class responsible for handling user login logic.
 * 
 * This class encapsulates the authentication process by validating
 * a user's email and password through the provided `UserRepositoryInterface`.
 * 
 * Throws an `AuthError` if authentication fails.
 */

export default class LoginUseCase {
  /**
   * Repository to access user data.
   * Should implement the `UserRepositoryInterface`.
   */
  private userRepository: UserRepositoryInterface

  /**
   * Constructs a new instance of the `LoginUseCase` with the given repository.
   * 
   * @param userRepository - A repository that implements `UserRepositoryInterface`,
   *                         used to retrieve user data.
   */
  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository
  }

  /**
   * Attempts to authenticate a user using their email and password.
   * 
   * @param email - The user's email address.
   * @param password - The user's plaintext password.
   * @returns A `User` object if authentication succeeds.
   * @throws {AuthError} If the user is not found or the password is incorrect.
   */
  async login(email: string, password: string): Promise<User> {
    const user = await this.userRepository.get({ email })

    if (!user) throw new AuthError('User not found')
    if (password !== user.password) throw new AuthError('Password is incorrect')

    return user
  }
}
