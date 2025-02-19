<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

const { setBreadcrumb } = useBreadcrumb()

const route = useRoute()
const id = route.params.id

onBeforeMount(() => {
  setBreadcrumb([
    {
      text: 'Home',
      to: '/',
    },
    {
      text: 'Product Category',
      to: '/product-category',
    },
    {
      text: 'Edit',
      to: `/product-category/${id}/edit`,
    },
  ])
})

const { $api } = useNuxtApp()

const { data, suspense } = useQuery({
  queryKey: ['product-category', id],
  queryFn: () => $api.productCategory.find(Number(id)),
})

await suspense()
</script>

<template>
  <AppHeader class="mb-10">
    Edit Product Category {{ id }}
  </AppHeader>

  <FormProductCategory action="update" :initial-values="data?.data" />
</template>
