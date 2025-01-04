'use client'

import { SignUp } from '@clerk/nextjs'

import { useClerkTheme } from '@/hooks/use-clerk-theme'

export default function Page() {
  const theme = useClerkTheme()
  return <SignUp appearance={{ baseTheme: theme }} />
}
