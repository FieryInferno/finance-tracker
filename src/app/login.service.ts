import LoginUseCase from '@/app/usecases/login.usecase'
import UserRepository from '@/app/repositories/user.repository'

const loginService = new LoginUseCase(new UserRepository())

export default loginService
