<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { useVModel } from '@vueuse/core'
import { Input } from '../ui/input'

interface Props {
  wrapperClass?: string
  name?: string
  id?: string
  placeholder?: string
  inputClass?: string
  disabled?: boolean
  prefixIcon?: FunctionalComponent
  value?: any
  modelValue?: any
  defaultValue?: any
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <div :class="wrapperClass" class="relative">
    <Input
      :id="id || name"
      v-model="modelValue"
      type="text"
      :name="name"
      :class="[inputClass, { 'ps-11': prefixIcon }]"
      :disabled="disabled"
      :aria-describedby="id || name"
      :placeholder="placeholder"
    />
    <div v-if="prefixIcon" class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
      <component :is="prefixIcon" />
    </div>
  </div>
</template>
