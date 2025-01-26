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
  apiRepository: $api.products,
  updateMethod: 'update',
  createMethod: 'create',
  redirect: '/product',
  title: 'Product',
  action,
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
    <FormField v-slot="{ componentField }" name="description">
      <FormItem class="mb-4">
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea placeholder="Description" v-bind="componentField" :disabled="isPending" />
        </FormControl>
        <FormMessage class="text-xs" />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="price">
      <FormItem class="mb-4">
        <FormLabel>Price</FormLabel>
        <FormControl>
          <Input
            type="number"
            placeholder="Price"
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
