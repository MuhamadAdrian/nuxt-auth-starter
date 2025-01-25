<script setup lang="ts">
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
    {
      text: 'Create',
      to: '/product/create',
    },
  ])
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <AppHeader class="mb-10">
      Create Product
    </AppHeader>
  </div>
</template>
