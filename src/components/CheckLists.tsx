import prisma from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { type Task, type List } from '@prisma/client';
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '@/lib/utils';
import { ListMap } from '@/lib/const';
import CheckListFooter from './CheckListFooter';
import TaskItem from './TaskItem';

interface Props {
  checkList: List & { tasks: Task[] };
}

function CheckList({ checkList }: Props) {
  const { name, color, tasks } = checkList;

  return (
    <Card
      className={cn("w-full text-white sm:col-span-2", ListMap.get(color))}
      x-chunk="dashboard-05-chunk-0"
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0
          ? (<p>目前没有任务</p>)
          : (
            <div>
              {tasks.map(task => <TaskItem key={task.id} task={task} />)}
            </div>
          )
        }
      </CardContent>
      <CardFooter className="flex-col pb-2">
        <CheckListFooter checkList={checkList} />
      </CardFooter>
    </Card>
  );
}

export default async function CheckLists() {
  const user = await currentUser()
  const checkLists = await prisma.list.findMany({
    where: { userId: user?.id },
    include: { tasks: true },
  })

  if (checkLists.length === 0) {
    return <div>尚未创建清单，赶紧创建一个吧！</div>
  }

  return (
    <div className="mt-6 flex w-full flex-col gap-4">
      {checkLists.map(checkList => <CheckList key={checkList.id} checkList={checkList} />)}
    </div>
  )
}
