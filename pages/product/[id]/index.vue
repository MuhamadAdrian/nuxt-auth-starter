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
      text: 'View',
      to: `/product/${id}`,
    },
  ])
})

const { $api } = useNuxtApp()

const { data, isLoading, isError } = useQuery({
  queryKey: ['product', id],
  queryFn: () => $api.product.find(Number(id)),
})

const detail = computed(() => data.value?.data)
</script>

<template>
  <AppHeader class="mb-10">
    View Product {{ id }}
  </AppHeader>

  <div v-if="isLoading" class="text-center">
    <p>Loading...</p>
  </div>

  <div v-else-if="isError" class="text-center text-red-500">
    <p>Error loading product details.</p>
  </div>

  <div v-else class="bg-white shadow-md rounded-lg p-6">
    <h2 class="text-2xl font-bold mb-4">
      {{ detail?.name }}
    </h2>
    <p class="text-gray-700 mb-4">
      {{ detail?.description }}
    </p>
    <p class="text-lg font-semibold text-green-600">
      {{ toRupiah(detail?.price) }}
    </p>
  </div>
</template>
