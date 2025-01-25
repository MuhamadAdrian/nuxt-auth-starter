<script setup lang="ts">
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
</script>

<template>
  <div class="container py-10 mx-auto">
    <AppHeader class="mb-10">
      Edit Product {{ id }}
    </AppHeader>
  </div>
</template>
