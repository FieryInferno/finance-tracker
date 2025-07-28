import CategoryRepositoryInterface from '@/app/(admin)/categories/create/repositories/category.repository.interface'
import { isDevelopment } from '@/app/utils'

export default class CategoryRepository implements CategoryRepositoryInterface {
  async create(name: string, color: string) {
    try {
      const body = new FormData()

      body.set('name', name)
      body.set('color', color)

      await fetch('https://script.google.com/macros/s/AKfycbxPh5CZ4oyDmX1mHMEVuNRxMAPNso5VB0fJGw_Q0QOCZcio2ke9z-7hKE5h-S5aQA9r/exec', { body, method: 'POST' })

      return { name, color }
    } catch (error: unknown) {
      if (isDevelopment) console.error(error)

      return { error: error instanceof Error ? error?.message : 'Failed to create category' }
    }
  }
}