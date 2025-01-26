import type { FetchOptions } from 'ofetch'
import { modules } from '~/api/modules'

export default defineNuxtPlugin((nuxtApp) => {
  const { token } = useAuth()

  const fetchOptions: FetchOptions = {
    baseURL: nuxtApp.$config.public.baseApiUrl,
    onRequest({ options }) {
      options.headers.set('Authorization', token.value as string)
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/auth/login'))
      }
    },
    credentials: 'include',
  }

  /** create a new instance of $fetcher with custom option */
  const apiFetcher = $fetch.create(fetchOptions)

  return {
    provide: {
      api: modules(apiFetcher),
    },
  }
})
