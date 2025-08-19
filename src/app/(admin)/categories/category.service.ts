import CategoryUseCase from './category.usecase'
import CategoryRepository from './repositories/category.repository'

export default new CategoryUseCase(new CategoryRepository())
