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
      text: 'Product',
      to: '/product',
    },
    {
      text: 'Edit',
      to: `/product/${id}/edit`,
    },
  ])
})

const { $api } = useNuxtApp()

const { data, suspense } = useQuery({
  queryKey: ['product', id],
  queryFn: () => $api.products.find(Number(id)),
})

await suspense()
</script>

<template>
  <AppHeader class="mb-10">
    Edit Product {{ id }}
  </AppHeader>

  <FormProduct action="update" :initial-values="data?.data" />
</template>
