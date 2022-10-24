import Service from "../classes/service"

export type User = {
  id: number
  name: string
  email: string
  token: string
  isLoggedIn: boolean
}

const service = new Service<User>('user', 'user')

export default service