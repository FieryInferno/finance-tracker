import CategoryUseCase from './category.usecase'
import CategoryRepository from './repositories/category.repository'

const categoryService = new CategoryUseCase(new CategoryRepository())

export default categoryService
