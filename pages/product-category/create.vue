<script setup lang="ts">
const { setBreadcrumb } = useBreadcrumb()

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
      text: 'Create',
      to: '/product-category/create',
    },
  ])
})
</script>

<template>
  <AppHeader class="mb-10">
    Create Product Category
  </AppHeader>

  <FormProductCategory />
</template>
