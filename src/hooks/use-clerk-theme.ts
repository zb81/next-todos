'use client'

import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'

export function useClerkTheme() {
  const { resolvedTheme } = useTheme()
  return resolvedTheme === 'dark' ? dark : undefined
}
