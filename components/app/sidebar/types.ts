import type { FunctionalComponent } from 'vue'

export interface Item {
  title: string
  url: string
  icon: FunctionalComponent
  group?: string
}
