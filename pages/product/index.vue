<script setup lang="ts">
import type { Header } from '@/components/app/table/types'
import { useQuery } from '@tanstack/vue-query'

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
  },
])

const { $api } = useNuxtApp()

const { data, suspense, isLoading } = useQuery({
  queryKey: ["products"],
  queryFn: () => $api('/products'),
});
</script>

<template>
  <div class="container py-10 mx-auto">
    <AppHeader class="mb-10">
      Productx
    </AppHeader>
    <AppTable :headers="headers" :items="[]" />
  </div>
</template>
