import type { $Fetch, NitroFetchRequest } from 'nitropack'
import ProductCategoryModule from './productCategory'
import ProductModule from './products'

export function modules($fetch: $Fetch<unknown, NitroFetchRequest>) {
  return {
    product: new ProductModule($fetch, '/products'),
    productCategory: new ProductCategoryModule($fetch, '/product-categories'),
  }
}
