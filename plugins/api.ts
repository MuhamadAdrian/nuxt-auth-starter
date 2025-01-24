export default defineNuxtPlugin((nuxtApp) => {
    const { token } = useAuth()
    const { public: { baseApiUrl } } = useRuntimeConfig()
  
    const api = $fetch.create({
      baseURL: baseApiUrl,
      onRequest({ request, options, error }) {
        if (token) {
          // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
          options.headers.set('Authorization', `Bearer ${JSON.stringify(token)}`)
        }
      },
      async onResponseError({ response }) {
        if (response.status === 401) {
          await nuxtApp.runWithContext(() => navigateTo('/auth/login'))
        }
      }
    })
  
    // Expose to useNuxtApp().$api
    return {
      provide: {
        api
      }
    }
  })
  