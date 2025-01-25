import type { FetchOptions } from 'ofetch'
import { modules } from '~/api/modules'

export default defineNuxtPlugin((nuxtApp) => {
  const { token } = useAuth()

  const fetchOptions: FetchOptions = {
    baseURL: nuxtApp.$config.public.baseApiUrl,
    headers: {
      Authorization: token.value as string,
    },
  }

  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions)

  return {
    provide: {
      api: modules(apiFetcher),
    },
  }
})
