import CategoryRepositoryInterface from '@/app/(admin)/categories/repositories/category.repository.interface'
import CategoryModel from '../category.entity'
import { isDevelopment } from '@/app/utils'
import { Category } from '../types'
import { v4 as uuidv4 } from 'uuid'

export default class CategoryRepository implements CategoryRepositoryInterface {
  private URL_POST_GOOGLE_SHEET: string =
    'https://script.google.com/macros/s/AKfycbxgTt1lMBzpaMHAm5SUpVTAGZD_Qo_Ur4l6NhiQonexJEQDOoW7CSHJrRo9-aSywM79EQ/exec'

  async create(name: string, color: string) {
    const body = new FormData()
    const id_category = uuidv4()

    body.set('type', 'CREATE')
    body.set('id_category', id_category)
    body.set('name', name)
    body.set('color', color)

    return await this.handleResponse<
      { values: Array<Array<string>> },
      Category
    >(fetch(this.URL_POST_GOOGLE_SHEET, { body, method: 'POST' }), () => ({
      id_category,
      name,
      color
    }))
  }

  /**
   * Handles an HTTP response and transforms the JSON result into a final data shape.
   *
   * @template TResponseJson - The raw JSON shape returned by the API.
   * @template TFinalData - The final transformed data type.
   *
   * @param {Promise<Response>} promise - A promise that resolves to a `Response` object (e.g., from `fetch`).
   * @param {(param: TResponseJson) => TFinalData} generateData - A mapping function that converts the parsed JSON
   *                                                              into the desired final data format.
   *
   * @returns {Promise<{ data: TFinalData | null, error: string | null }>}
   *          An object containing either:
   *          - `data`: The transformed result if successful, or `null` on error.
   *          - `error`: An error message string if an error occurred, or `null` on success.
   *
   * @throws {Error} - Will log the error to console if `isDevelopment` is `true`.
   *
   * @example
   * // Example usage for fetching categories from Google Sheets
   * const result = await handleResponse<{ values: string[][] }, Category[]>(
   *   fetch(sheetUrl),
   *   (data) => (data.values ?? []).map(([name, color]) => CategoryModel.fromJson({ name, color }))
   * );
   *
   * if (result.error) {
   *   console.error(result.error);
   * } else {
   *   console.log(result.data);
   * }
   */
  private async handleResponse<TResponseJson, TFinalData>(
    promise: Promise<Response>,
    generateData: (param: TResponseJson) => TFinalData
  ): Promise<{ data: TFinalData | null; error: string | null }> {
    try {
      const response = await promise

      if (!response.ok) {
        const errText = await response.text().catch(() => '')

        return {
          data: null,
          error: `Request failed (${response.status}): ${errText || response.statusText}`
        }
      }

      let json: TResponseJson
      try {
        json = await response.json()
      } catch {
        return { data: null, error: 'Invalid JSON response' }
      }

      return { data: generateData(json), error: null }
    } catch (error) {
      if (isDevelopment) console.error(error)

      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  async delete(id_category: string) {
    const body = new FormData()

    body.set('type', 'DELETE')
    body.set('id_category', id_category)

    return await this.handleResponse<{ values: Array<Array<string>> }, string>(
      fetch(this.URL_POST_GOOGLE_SHEET, { body, method: 'POST' }),
      () => id_category
    )
  }

  /**
   * Fetches the "Categories" data from a Google Sheet and maps it to an array of `Category` instances.
   *
   * @returns {Promise<{ data: Category[] | null, error: string | null }>}
   *          - `data`: An array of `Category` objects if successful, or `null` on error.
   *          - `error`: A string describing the error if it occurred, otherwise `null`.
   */
  read = async () =>
    await this.handleResponse<{ values: Array<Array<string>> }, Category[]>(
      fetch(
        `${process.env.URL_GOOGLE_SHEET}Categories!A2:C1000?key=${process.env.API_KEY_GOOGLESHEET}`
      ),
      (data) =>
        (data.values ?? []).map(([id_category, name, color]) =>
          CategoryModel.fromJson({ id_category, name, color })
        )
    )
}
