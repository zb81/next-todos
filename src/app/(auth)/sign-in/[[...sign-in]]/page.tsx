'use client'

import { useClerkTheme } from '@/hooks/use-clerk-theme'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  const theme = useClerkTheme()
  return <SignIn appearance={{ baseTheme: theme }} />
}
