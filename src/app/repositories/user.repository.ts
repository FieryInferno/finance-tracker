import UserRepositoryInterface from '@/app/repositories/user.repository.interface'
import { User } from '@/app/types'
import { isDevelopment } from '@/app/utils'

/**
 * @class UserRepository
 * 
 * Implementation of the `UserRepositoryInterface` that retrieves user data
 * from a public Google Sheets document using the Google Sheets API.
 * 
 * It fetches data from a predefined spreadsheet range and attempts to
 * find a user by email. The spreadsheet is expected to have the email
 * in the first column (A) and the password in the second column (B).
 * 
 * Environment Variables Required:
 * - `SPREADSHEET_ID`: The ID of the Google Spreadsheet.
 * - `API_KEY_GOOGLESHEET`: The API key with access to the Sheets API.
 * 
 * @example
 * const repo = new UserRepository();
 * const user = await repo.get({ email: 'test@example.com' });
 */
export default class UserRepository implements UserRepositoryInterface {
  /**
   * Fetches a user by email from a Google Spreadsheet.
   *
   * @param params - An optional object containing the user's email to search for.
   * @returns A `User` object if the email is found, or `null` if not found or an error occurs.
   *
   * The method reads rows from column A (email) and B (password), starting from row 2.
   */
  async get(params?: { email?: string }): Promise<User | null> {
    try {
      const SPREADSHEET_ID = process.env.SPREADSHEET_ID
      const API_KEY_GOOGLESHEET = process.env.API_KEY_GOOGLESHEET
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A2:B1000?key=${API_KEY_GOOGLESHEET}`)
      const { values } = await response.json() ?? {}
      const data = values.find((value: string[]) => value[0] === params?.email)

      if (!data) return null
      if (data.length < 2) return null

      return { email: data[0], password: data[1] }
    } catch (error) {
      if (isDevelopment) console.error('UserRepository.get error:', error)

      return null
    }
  }
}