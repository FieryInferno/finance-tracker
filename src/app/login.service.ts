import LoginUseCase from '@/app/usecases/login.usecase'
import UserRepository from '@/app/repositories/user.repository'

export default new LoginUseCase(new UserRepository())
