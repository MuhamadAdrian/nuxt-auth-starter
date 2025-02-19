import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const productCategorySchema = z.object({
  name: z.string(),
})

export const formSchema = toTypedSchema(productCategorySchema)
export type ProductCategoryTypeSchema = z.infer<typeof productCategorySchema>
