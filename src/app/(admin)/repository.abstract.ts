import { isDevelopment } from '../configs'

export default abstract class ARepository {
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
  protected async handleResponse<TResponseJson, TFinalData>(
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

  /**
   * Reads data from a specified Google Sheet and processes the response using a callback function.
   *
   * @template TResponseJson - The type of the raw response data from the Google Sheet.
   * @template TFinalData - The type of the final processed data returned by the callback.
   * @param sheet - The name or identifier of the sheet to read from.
   * @param cb - A callback function that receives the raw response data and returns the processed data.
   * @returns A promise that resolves to the processed data of type `TFinalData`.
   */
  protected _read = async <TResponseJson, TFinalData>(sheet: string, cb: (data: { values: TResponseJson }) => TFinalData) =>
    await this.handleResponse<{ values: TResponseJson }, TFinalData>(
      fetch(
        `${process.env.URL_GOOGLE_SHEET}${sheet}!A2:F1000?key=${process.env.API_KEY_GOOGLESHEET}`
      ), cb
    )
}
