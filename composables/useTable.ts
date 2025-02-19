import type { Ref } from 'vue'
import { type QueryFunction, useQuery } from '@tanstack/vue-query'
import { debouncedRef } from '@vueuse/core'
import { useToast } from '~/components/ui/toast'

interface UseTableOptions<TData> {
  key: string[]
  query: QueryFunction<TData>
  serverSide?: boolean
}

export default function useTable<TData>(options: UseTableOptions<TData>) {
  const { toast } = useToast()
  const route = useRoute()
  const router = useRouter()

  // Page state
  const pageClient = ref(1)
  const page = computed<number>({
    get: () =>
      options.serverSide
        ? Number(route.query.page) || 1
        : pageClient.value,

    set: (val: number) => {
      if (options.serverSide) {
        router.replace({
          query: {
            ...route.query,
            page: val,
          },
        })
      }
      else {
        pageClient.value = val
      }
    },
  })
  // const debouncedPage = debouncedRef(page, 500)

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

  const queryKey = computed(() => [
    ...options.key,
    { search: debouncedSearch.value, page: page.value },
  ])

  // Query setup
  const { status, error, ...resQuery } = useQuery<TData>({
    queryKey,
    queryFn: options.query,
  })

  watch(status, (val) => {
    if (val === 'error') {
      toast({
        title: 'Something went wrong',
        description: error.value?.message,
        variant: 'destructive',
      })
    }
  })

  return {
    ...resQuery,
    loading: resQuery.isLoading,
    search,
    page,
    data: resQuery.data as Ref<TData | undefined>,
  }
}
