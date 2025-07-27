import LoginUseCase from '@/app/login.usecase'
import UserRepository from '@/app/user.repository'

export default new LoginUseCase(new UserRepository())