<script setup lang="ts">
import { EyeIcon, PencilIcon, TrashIcon } from 'lucide-vue-next'
import { useToast } from '../ui/toast'

interface Props {
  id: number
  hideView?: boolean
  hideDelete?: boolean
  hideEdit?: boolean
  deleteEndpoint?: () => Promise<unknown>
  title?: string
  loading?: boolean
  refresh?: VoidFunction
  pagePath?: string
}

const { id, refresh, deleteEndpoint, pagePath, hideDelete = false } = defineProps<Props>()

function handleAction(type: 'view' | 'edit' | 'delete') {
  let routePath = pagePath
  let routeQuery = ''
  if (pagePath?.includes('?')) {
    routePath = pagePath.split('?')[0]
    routeQuery = `?${pagePath.split('?')[1].toString()}`
  }

  // On View
  if (type === 'view')
    navigateTo(`/${routePath}/${id}${routeQuery}`)
  else if (type === 'edit')
    navigateTo(`/${routePath}/${id}${routeQuery}/edit`)
  else handleShowModalDelete()
}

const showDeleteModal = ref(false)

function handleShowModalDelete() {
  showDeleteModal.value = !showDeleteModal.value
}

const isDeleting = ref(false)

const { toast } = useToast()

async function handleDelete() {
  if (hideDelete || !deleteEndpoint)
    return

  try {
    isDeleting.value = true

    await deleteEndpoint()

    toast({
      title: 'Delete Successfully',
      variant: 'default',
    })

    if (refresh)
      refresh()
  }
  catch (error: any) {
    toast({
      title: error.response?._data.message,
      description: 'There was a problem with your request.',
      variant: 'destructive',
    })
  }
  finally {
    isDeleting.value = false
    showDeleteModal.value = false
  }
}
</script>

<template>
  <div class="inline-flex gap-2">
    <Button v-if="!hideView" variant="ghost" size="icon" class="cursor-pointer" type="button" @click="handleAction('view')">
      <EyeIcon class="w-5 h-5" />
    </Button>
    <Button v-if="!hideEdit" variant="ghost" size="icon" class="cursor-pointer" type="button" @click="handleAction('edit')">
      <PencilIcon class="w-5 h-5" />
    </Button>
    <Button v-if="!hideDelete" variant="ghost" size="icon" class="cursor-pointer" type="button" @click="handleAction('delete')">
      <TrashIcon class="w-5 h-5" />
    </Button>
  </div>

  <AppModal
    v-model:open="showDeleteModal"
    :title="`Are you sure want to delete ${title || ''} ?`"
    description="Make sure you are right about this operation"
    cancel-text="Cancel"
    :loading="isDeleting"
    confirm-text="Delete"
    @delete="handleDelete"
  />
</template>
