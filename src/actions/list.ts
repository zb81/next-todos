'use server'

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { createListSchema, type CreateListSchemaType } from "@/lib/zod";
import prisma from "@/lib/prisma";

export async function createList(data: CreateListSchemaType) {
  const user = await currentUser()
  if (!user) {
    throw new Error("用户未登录")
  }
  const result = createListSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      message: result.error.flatten().fieldErrors,
    }
  }

  await prisma.list.create({
    data: {
      userId: user.id,
      color: data.color,
      name: data.name,
    }
  })


  revalidatePath('/')

  return {
    success: true,
    message: '清单创建成功',
  }
}

export async function deleteList(id: number) {
  const user = await currentUser()

  if (!user) {
    throw new Error("用户未登录")
  }

  await prisma.list.delete({
    where: {
      id,
      userId: user.id,
    }
  })

  revalidatePath('/')
}
