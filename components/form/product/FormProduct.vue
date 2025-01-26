<script setup lang="ts" generic="T">
import type { FormProps } from '../types'
import { useMutation } from '@tanstack/vue-query'
import { LoaderIcon } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { useToast } from '~/components/ui/toast'
import { formSchema } from './schema'

interface Props extends FormProps<T> {}
const { action = 'create', initialValues } = defineProps<Props>()

const route = useRoute()
const id = route.params.id

const { handleSubmit, setErrors } = useForm({
  validationSchema: formSchema,
  initialValues: initialValues as any,
})

const { $api } = useNuxtApp()
const { toast } = useToast()

const { isPending, mutate } = useMutation({
  mutationFn: (body: any) => action === 'create' ? $api.products.create(body) : $api.products.update(Number(id), body),
  onError(error) {
    const err = useApiError(error)
    setErrors(err.bag)
  },
  onSuccess() {
    toast({
      title: `Product successfully ${action === 'create' ? 'created' : 'updated'}`,
    })

    navigateTo('/product')
  },
})

const onSubmit = handleSubmit((values) => {
  mutate(values)
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
