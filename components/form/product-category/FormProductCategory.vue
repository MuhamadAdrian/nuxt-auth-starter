<script setup lang="ts" generic="T">
import type { FormProps } from '../types'
import { LoaderIcon } from 'lucide-vue-next'
import { formSchema } from './schema'

interface Props extends FormProps<T> {}
const { action = 'create', initialValues } = defineProps<Props>()

const { $api } = useNuxtApp()

const { isPending, onSubmit } = useFormBase({
  validationSchema: formSchema,
  initialValues,
  apiRepository: $api.productCategory,
  updateMethod: 'update',
  createMethod: 'create',
  redirect: '/product-category',
  title: 'Product Category',
  action,
  invalidateKey: ['product-category'],
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem class="mb-4">
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Name"
            v-bind="componentField"
            :disabled="isPending"
          />
        </FormControl>
        <FormMessage class="text-xs" />
      </FormItem>
    </FormField>
    <Button type="submit" class="w-full mt-2" :disabled="isPending">
      <LoaderIcon v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
      {{ action === 'create' ? 'Save' : 'Update' }}
    </Button>
  </form>
</template>
