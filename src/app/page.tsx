import CheckLists from "@/components/CheckLists";
import CreateListModal from "@/components/CreateListModal";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

async function Welcome() {
  const user = await currentUser()

  if (!user) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          欢迎 {user.firstName} {user.lastName}
        </CardTitle>
        <CardDescription>
          不积跬步无以至千里，不积小流无以成江海。
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <CreateListModal />
      </CardFooter>
    </Card>
  )
}

export default function HomePage() {
  return (
    <main className="flex w-full flex-col items-center px-4">
      <Suspense fallback={null}>
        <Welcome />
      </Suspense>

      <Suspense fallback={null}>
        <CheckLists />
      </Suspense>
    </main>
  );
}
