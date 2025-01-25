<script setup lang="ts">
import type { Header } from '@/components/app/table/types'
import type { Product } from '~/api/modules/products'
import type { Response } from '~/api/types'

const { setBreadcrumb } = useBreadcrumb()

onBeforeMount(() => {
  setBreadcrumb([
    {
      text: 'Home',
      to: '/',
    },
    {
      text: 'Product',
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
  key: ['products'],
  query: (): Promise<Response<Product[]>> => $api.products.get({ search: search.value, page: page.value }),
  serverSide: true,
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <AppHeader class="mb-10">
      Product X
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
      :items="data?.data"
      :add-handler="() => { navigateTo('/product/create') }"
    >
      <template #item.action="{ item }">
        <AppAction
          :id="item.id"
          :delete-endpoint="() => $api.products.delete(item.id)"
          :title="item.name"
          page-path="product"
          :refresh="refetch"
        />
      </template>
    </AppTable>
  </div>
</template>
