import type { Response, ResponseSingle } from '../types'
import type { ProductCategoryTypeSchema } from '~/components/form/product-category/schema'
import BaseApiModule from '..'

export interface ProductCategory {
  id: number
  name: string
}

class ProductCategoryModule extends BaseApiModule {
  async get(params?: { search?: string, page: number }): Promise<Response<ProductCategory[]>> {
    return await this.call({ method: 'GET', params })
  }

  async delete(id: number): Promise<Response<ProductCategory[]>> {
    return await this.call({ method: 'DELETE', url: `${this.path}/${id}` })
  }

  async find(id: number): Promise<ResponseSingle<ProductCategory>> {
    return await this.call({ method: 'GET', url: `${this.path}/${id}` })
  }

  async create(body: ProductCategoryTypeSchema): Promise<ResponseSingle<ProductCategory>> {
    return await this.call({ method: 'POST', body })
  }

  async update(id: number, body: ProductCategoryTypeSchema): Promise<ResponseSingle<ProductCategory>> {
    return await this.call({ method: 'PUT', body, url: `${this.path}/${id}` })
  }
}

export default ProductCategoryModule
