import axios from "axios"

export type Filter = {
  id: number
  page: number
  limit: number
  order: string
  desc: boolean
  search: string
  more: boolean
}

export default class Service<T> {

  public readonly module: string
  public readonly controller: string
  public readonly baseUrl: string
  private config: any

  constructor(module: string, controller: string) {
    this.module = module
    this.controller = controller
    this.baseUrl = `http://localhost:3001/${module}/${controller}`
  }

  setToken(token: string) {
    this.config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  }

  async get(f: Filter): Promise<T[]> {
    const { data } = await axios.get(`${this.baseUrl}?page=${f.page}&limit=${f.limit}&order=${f.order}&desc=${f.desc}&search=${f.search}`, this.config);
    return data
  }

  async getById(id: string | number): Promise<T> {
    const { data } = await axios.get(`${this.baseUrl}/${id}`, this.config);
    return data
  }

  async save(o: T): Promise<T> {
    const { data } = await axios.post(this.baseUrl, o, this.config);
    return data
  }

  async delete(id: number) {
    const { data } = await axios.delete(`${this.baseUrl}/${id}`, this.config);
  }

}