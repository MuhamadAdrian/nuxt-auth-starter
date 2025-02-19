<script setup lang="ts">
import type { Header } from '@/components/app/table/types'
import type { ProductCategory } from '~/api/modules/productCategory'
import type { Response } from '~/api/types'

const { setBreadcrumb } = useBreadcrumb()

onBeforeMount(() => {
  setBreadcrumb([
    {
      text: 'Home',
      to: '/',
    },
    {
      text: 'Product Category',
      to: '/product',
    },
  ])
})

const headers = ref<Header[]>([
  {
    label: 'No',
    value: 'no',
  },
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Description',
    value: 'description',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Action',
    value: 'action',
    align: 'center',
  },
])

const { $api } = useNuxtApp()

const { data, loading, search, page, refetch } = useTable({
  key: ['product-category'],
  query: (): Promise<Response<ProductCategory[]>> => $api.productCategory.get({ search: search.value, page: page.value }),
  serverSide: false,
})
</script>

<template>
  <AppHeader class="mb-10">
    Product Category X
  </AppHeader>
  <AppTable
    v-model:search="search"
    v-model:page="page"
    :headers="headers"
    :loading="loading"
    :pagination="{
      page: data?.meta.currentPage,
      perPage: data?.meta.pageSize,
      total: data?.meta.totalItems,
      totalPages: data?.meta.totalPages,
    }"
    :items="data?.data!"
    :add-handler="() => { navigateTo('/product-category/create') }"
  >
    <template #item.action="{ item }">
      <AppAction
        :id="item.id"
        :delete-endpoint="() => $api.productCategory.delete(item.id)"
        :title="item.name"
        page-path="product-category"
        :refresh="refetch"
      />
    </template>
  </AppTable>
</template>
