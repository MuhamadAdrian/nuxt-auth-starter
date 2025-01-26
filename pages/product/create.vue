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
  <AppHeader class="mb-10">
    Create Product
  </AppHeader>

  <FormProduct />
</template>
