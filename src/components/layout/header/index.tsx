import ThemeToggle from './ThemeToggle'
import UserButton from './UserButton'

export default function Header() {
  return (
    <nav className='flex h-[60px] w-full items-center justify-between p-4'>
      <h1>云朵清单</h1>
      <div className='flex items-center gap-2'>
        <UserButton />
        <ThemeToggle />
      </div>
    </nav>
  )
}
