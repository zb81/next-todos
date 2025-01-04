'use client'

import { UserButton as ClerkUserButton } from '@clerk/nextjs'

import { useClerkTheme } from '@/hooks/use-clerk-theme'

export default function UserButton() {
  const theme = useClerkTheme()
  return <ClerkUserButton appearance={{ baseTheme: theme }} />
}
