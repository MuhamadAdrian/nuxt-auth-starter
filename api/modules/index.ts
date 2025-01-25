import type { $Fetch, NitroFetchRequest } from 'nitropack'
import ProductModule from './products'

export function modules($fetch: $Fetch<unknown, NitroFetchRequest>) {
  return {
    products: new ProductModule($fetch, '/products'),
  }
}
