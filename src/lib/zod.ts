import { z } from 'zod'
import { ListMap } from './const'

export const createListSchema = z.object({
  name: z.string().min(1, {
    message: '请输入名称',
  }),
  color: z.string().min(1, {
    message: '请选择一个颜色'
  }).refine(color => [...ListMap.keys()].includes(color))
})
export type CreateListSchemaType = z.infer<typeof createListSchema>
