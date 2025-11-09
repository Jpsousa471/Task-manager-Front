import { Plus } from 'lucide-react'
import logo from '../assets/logo-task-manager.png'
import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'

export function Header() {
  return (
    <header className='flex h-16 w-full items-center justify-center'>
      <div className='flex h-full w-full max-w-screen-lg items-center justify-between'>
        <div className='flex items-center'>
          <img alt='Logotipo' className='h-16 w-16' src={logo} />
          <h1 className='font-semibold text-2xl'>Task Manager</h1>
        </div>

        <Button className='rounded-full' size='icon'>
          <Plus className='text-white' />
        </Button>

        <ModeToggle />
      </div>
    </header>
  )
}
