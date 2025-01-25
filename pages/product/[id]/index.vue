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
      text: 'View',
      to: `/product/${id}`,
    },
  ])
})
</script>

<template>
  <div class="container py-10 mx-auto">
    <AppHeader class="mb-10">
      View Product {{ id }}
    </AppHeader>
  </div>
</template>
