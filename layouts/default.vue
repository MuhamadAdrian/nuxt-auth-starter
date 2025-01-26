<script setup lang="ts">
const breadcrumbStore = useBreadcrumb()

const { breadcrumb } = storeToRefs(breadcrumbStore)

const { menu } = useAppConfig()
</script>

<template>
  <SidebarProvider>
    <AppSidebar :menu="menu" />
    <main class="w-full">
      <div class="flex items-center p-4 gap-4">
        <SidebarTrigger />
        <AppBreadcrumb v-if="breadcrumb.length" :items="breadcrumb" />
      </div>
      <div class="p-4">
        <div class="sm:container sm:py-10 sm:mx-auto">
          <slot />
        </div>
      </div>
    </main>
  </SidebarProvider>
</template>
