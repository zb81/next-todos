'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { createListSchema, type CreateListSchemaType } from "@/lib/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { cn } from "@/lib/utils"
import { ListMap } from "@/lib/const"
import { createList } from "@/actions/list"
import { toast } from "@/hooks/use-toast"

export default function CreateListModal() {
  const form = useForm<CreateListSchemaType>({
    resolver: zodResolver(createListSchema),
    defaultValues: {
      name: '',
      color: '',
    },
  })
  const [open, setOpen] = useState(false)

  const onSubmit = async (data: CreateListSchemaType) => {
    try {
      await createList(data)
      onOpenChange(false)
      console.log('清单创建成功')
      toast({
        title: '🎉 清单创建成功',
      })
    } catch (e) {
      console.log(e)
      toast({
        variant: 'destructive',
        title: '❌ 清单创建失败',
      })
    }
  }
  const onOpenChange = (open: boolean) => {
    form.reset()
    setOpen(open)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button>添加清单</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>添加清单</SheetTitle>
          <SheetDescription>
            清单是任务的集合，比如“工作”、“学习”、“生活”
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>清单名称</FormLabel>
                  <FormControl>
                    <Input autoFocus placeholder="例如：工作" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>背景颜色</FormLabel>
                  <FormControl>
                    <Select onValueChange={c => field.onChange(c)}>
                      <SelectTrigger
                        className={cn('w-[180px]', ListMap.get(field.value), {
                          "text-white": !!field.value,
                        })}
                      >
                        <SelectValue placeholder="选择清单的背景颜色" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {[...ListMap.entries()].map(
                            ([color, [className, name]]) => {
                              return (
                                <SelectItem
                                  key={color}
                                  value={color}
                                  className={cn(
                                    "my-1 w-full rounded-md text-white ring-black focus:font-bold focus:text-white focus:ring-2 dark:ring-white",
                                    className,
                                    `focus:${className}`,
                                  )}
                                >
                                  {name}
                                </SelectItem>
                              );
                            },
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              创建
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
