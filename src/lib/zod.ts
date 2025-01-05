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

export const createTaskSchema = z.object({
  listId: z.number().nonnegative(),
  content: z.string().min(1, {
    message: '请输入任务内容',
  }),
  expiresAt: z.date().optional(),
})
export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>
