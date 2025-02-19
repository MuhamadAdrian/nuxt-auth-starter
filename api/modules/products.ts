import type { Response, ResponseSingle } from '../types'
import type { ProductTypeSchema } from '~/components/form/product/schema'
import BaseApiModule from '..'

export interface Product {
  id: number
  name: string
  price: number
  description?: string
}

class ProductModule extends BaseApiModule {
  async get(params?: { search?: string, page: number }): Promise<Response<Product[]>> {
    return await this.call({ method: 'GET', params })
  }

  async delete(id: number): Promise<Response<Product[]>> {
    return await this.call({ method: 'DELETE', url: `${this.path}/${id}` })
  }

  async find(id: number): Promise<ResponseSingle<Product>> {
    return await this.call({ method: 'GET', url: `${this.path}/${id}` })
  }

  async create(body: ProductTypeSchema): Promise<ResponseSingle<Product>> {
    return await this.call({ method: 'POST', body })
  }

  async update(id: number, body: ProductTypeSchema): Promise<ResponseSingle<Product>> {
    return await this.call({ method: 'PUT', body, url: `${this.path}/${id}` })
  }
}

export default ProductModule
