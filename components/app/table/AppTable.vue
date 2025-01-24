<script setup lang="ts" generic="T">
import type { Header, Pagination } from './types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LoaderCircle, SearchIcon } from 'lucide-vue-next'

interface Props {
  headers: Header[]
  items: T | any
  showSearch?: boolean
  showPagination?: boolean
  pagination?: Pagination
  loading?: boolean
  searchPlaceholder?: string
  noPagination?: boolean
  noAction?: boolean
}

const { pagination = { page: 1, perPage: 10, total: 10 }, showSearch = true, loading = false, searchPlaceholder = 'Search..' } = defineProps<Props>()

defineEmits<{
  'change:pagination': []
}>()

const router = useRouter()
const route = useRoute()

const search = computed({
  get: () => route.query.search,
  set: (val) => {
    router.replace({
      query: {
        page: 1,
        search: val,
      },
    })
  },
})

function setAlignment(alignment?: 'start' | 'center' | 'end') {
  if (alignment === 'end')
    return 'text-end'
  else if (alignment === 'center')
    return 'text-center'
  else return 'text-start'
}

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

const page = computed<number>({
  get: () => Number(route.query.page) || 1,
  set: (val: number) => {
    router.replace({
        query: {
            ...route.query,
            page: val
        }
    })
  },
})

const handleUpdatePage = (pageNum: number) => {
    page.value = pageNum
}

</script>

<template>
  <div v-if="!noAction" class="flex justify-between items-center mb-2">
    <div class="min-w-[40%]">
      <div v-if="showSearch" class="relative max-w-xs">
        <AppSearchInput v-model="search" :prefix-icon="SearchIcon" :placeholder="searchPlaceholder" />
      </div>
    </div>
    <div class="flex pr-4 gap-2" :class="{ 'py-4': !showSearch }">
      <slot name="tools">
        <Button type="button">
          Tambah
        </Button>
      </slot>
    </div>
  </div>

  <Table>
    <TableHeader>
      <TableRow>
        <TableHead v-for="head, index in headers" :key="index" scope="col" :class="[setAlignment(head.align), head.headerClass]">
          <slot :name="`header.${head.value}`" :head="head">
            {{ head.label }}
          </slot>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-if="loading" class="hover:bg-white">
        <TableCell :colspan="headers.length">
          <LoaderCircle class="mt-10 h-6 w-6 animate-spin mx-auto" />
        </TableCell>
      </TableRow>
      <TableRow v-else-if="!items || items.length === 0" class="hover:bg-white">
        <TableCell :colspan="headers.length">
          <AppEmpty />
        </TableCell>
      </TableRow>
      <TableRow v-for="item, index in items" v-else :key="index">
        <TableCell v-for="head, colIndex in headers" :key="colIndex" :class="[head.cellClass, setAlignment(head.align)]" class="font-medium">
          <slot :name="`item.${head.value}`" :item="item">
            <span v-if="head.value === 'no'">{{ index }}</span>
            <span v-else>{{ getNestedValue(item, head.value) }} </span>
          </slot>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <AppPagination v-if="pagination" :page="page" @update:page="handleUpdatePage" />
</template>
