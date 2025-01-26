import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const productSchema = z.object({
  name: z.string(),
  description: z.string().min(8),
  price: z.number(),
})

export const formSchema = toTypedSchema(productSchema)
export type ProductTypeSchema = z.infer<typeof productSchema>
