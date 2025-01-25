import type { $Fetch, NitroFetchRequest } from 'nitropack'

class BaseApiModule {
  private $fetch: $Fetch<unknown, NitroFetchRequest>
  protected path: string

  constructor(fetcher: $Fetch<unknown, NitroFetchRequest>, path: string) {
    this.$fetch = fetcher
    this.path = path
  }

  async call<T>(params: { method: string, url?: string, body?: object, params?: object, extrass?: object }): Promise<T> {
    const $res: T = await this.$fetch(params.url ?? this.path, { method: params.method, body: params.body, params: params.params, ...params.extrass })
    return $res
  }
}

export default BaseApiModule
