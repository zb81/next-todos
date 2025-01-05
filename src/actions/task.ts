'use server'

import prisma from "@/lib/prisma";
import { createTaskSchema, type CreateTaskSchemaType } from "@/lib/zod";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createTask(data: CreateTaskSchemaType) {
  const user = await currentUser()

  if (!user) {
    throw new Error("用户未登录")
  }

  const result = createTaskSchema.safeParse(data)
  if (!result.success) {
    return {
      success: false,
      message: result.error.flatten().fieldErrors,
    }
  }

  const { content, listId, expiresAt } = data

  await prisma.task.create({
    data: {
      userId: user.id,
      content,
      expiresAt,
      list: {
        connect: { id: listId },
      }
    },
  })

  revalidatePath('/')
}

export async function setTaskDone(id: number) {
  const user = await currentUser()

  if (!user) {
    throw new Error("用户未登录")
  }

  await prisma.task.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      done: true,
    }
  })

  revalidatePath('/')
}
