<script setup lang="ts">
import type { Item } from './types'
import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  Search,
  Settings,
  User2,
} from 'lucide-vue-next'

interface Props {
  menu: Item[]
  header?: string
}

const { menu: items } = defineProps<Props>()

async function handleLogout() {
  navigateTo('/auth/logout')
}

const { data: user } = useAuth()

const itemGroups = computed(() => {
  const group = new Set(items.map(item => item.group))

  const groupsArray = [...group]

  return groupsArray.map((group) => {
    return {
      name: group,
      items: items.filter(item => item.group === group),
    }
  })
})
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader v-if="header">
      {{ header }}
    </SidebarHeader>
    <SidebarSeparator />
    <SidebarContent>
      <SidebarGroup v-for="(group, index) of itemGroups" :key="index">
        <SidebarGroupLabel>{{ group.name }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item of group.items" :key="item.title">
              <SidebarMenuButton as-child>
                <NuxtLink :to="item.url" class="hover:bg-accent">
                  <component :is="item.icon" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton class="hover:bg-accent justify-between">
                <div class="flex items-center gap-2">
                  <User2 width="16" /> {{ user?.name }}
                </div>
                <ChevronUp class-name="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              class-name="w-[--radix-popper-anchor-width]"
            >
              <DropdownMenuItem @click="handleLogout">
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
