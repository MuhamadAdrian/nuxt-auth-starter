import type { Ref } from 'vue'
import { type QueryFunction, useQuery } from '@tanstack/vue-query'
import { debouncedRef } from '@vueuse/core'

interface UseTableOptions<TData> {
  key: string[]
  query: QueryFunction<TData>
  serverSide?: boolean
}

export default function useTable<TData>(options: UseTableOptions<TData>) {
  const route = useRoute()
  const router = useRouter()

  // Page state
  const page = computed<number>({
    get: () => Number(route.query.page) || 1,
    set: (val: number) => {
      router.replace({
        query: {
          ...route.query,
          page: val,
        },
      })
    },
  })
  const debouncedPage = debouncedRef(page, 500)

  // Search state
  const searchClient = ref('')
  const search = computed<string>({
    get: () =>
      options.serverSide
        ? (route.query.search as string) || ''
        : searchClient.value,
    set: (val: string) => {
      if (options.serverSide) {
        router.replace({
          query: {
            ...route.query,
            page: 1, // Reset page when search changes
            search: val,
          },
        })
      }
      else {
        searchClient.value = val
      }
    },
  })
  const debouncedSearch = debouncedRef(search, 500)

  // Query setup
  const resQuery = useQuery<TData>({
    queryKey: [
      ...options.key,
      { search: debouncedSearch.value, page: debouncedPage.value },
    ],
    queryFn: options.query,
  })

  watch([debouncedSearch, debouncedPage], () => {
    resQuery.refetch()
  })

  return {
    ...resQuery,
    loading: resQuery.isLoading,
    search,
    page,
    data: resQuery.data as Ref<TData | undefined>,
  }
}
