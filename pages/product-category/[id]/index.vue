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
      to: '/product',
    },
    {
      text: 'View',
      to: `/product-category/${id}`,
    },
  ])
})

const { $api } = useNuxtApp()

const { data, isLoading, isError } = useQuery({
  queryKey: ['product', id],
  queryFn: () => $api.productCategory.find(Number(id)),
})

const detail = computed(() => data.value?.data)
</script>

<template>
  <AppHeader class="mb-10">
    View Product Category {{ id }}
  </AppHeader>

  <div v-if="isLoading" class="text-center">
    <p>Loading...</p>
  </div>

  <div v-else-if="isError" class="text-center text-red-500">
    <p>Error loading product category details.</p>
  </div>

  <div v-else class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-4">
      {{ detail?.name }}
    </h2>
  </div>
</template>
