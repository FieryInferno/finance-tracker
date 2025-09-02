import CategoryRepositoryInterface from '@/app/(admin)/categories/repositories/category.repository.interface'
import ARepository from '../../repository.abstract'
import CategoryModel from '../category.entity'
import { Category } from '@/app/(admin)/types'
import { v4 as uuidv4 } from 'uuid'

export default class CategoryRepository extends ARepository implements CategoryRepositoryInterface {
  /**
   * Creates a new category with the specified name and color.
   *
   * This method generates a unique category ID, constructs a FormData payload,
   * and sends a POST request to the Google Sheet endpoint to persist the category.
   * Returns a promise that resolves to the created `Category` object.
   *
   * @param name - The name of the category to create.
   * @param color - The color associated with the category.
   * @returns A promise that resolves to the created `Category`.
   */
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
    >(fetch(process.env.URL_POST_GOOGLE_SHEET!, { body, method: 'POST' }), () => ({
      id_category,
      name,
      color
    }))
  }

  async delete(id_category: string) {
    const body = new FormData()

    body.set('type', 'DELETE')
    body.set('id_category', id_category)

    return await this.handleResponse<{ values: Array<Array<string>> }, string>(
      fetch(process.env.URL_POST_GOOGLE_SHEET!, { body, method: 'POST' }),
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
  read = async () => await this._read<Array<Array<string>>, Category[]>('CATEGORIES', (data) =>
    (data.values ?? []).map(([id_category, name, color]) =>
      CategoryModel.fromJson({ id_category, name, color })
    )
  )
}
