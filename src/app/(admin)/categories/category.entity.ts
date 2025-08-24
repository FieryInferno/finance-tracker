import { Category } from './types'

export default class CategoryModel implements Category {
  name: string
  color: string
  id_category: string

  constructor(id_category: string, name: string, color: string) {
    this.id_category = id_category
    this.name = name
    this.color = color
  }
  static fromJson = (json: Category): Category =>
    new CategoryModel(json.id_category, json.name, json.color)
}
