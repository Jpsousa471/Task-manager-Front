import { ModeToggle } from './components/mode-toggle'
import { Button } from './components/ui/button'

export function App() {
  return (
    <div className='h-screen text-[28px] text-blue-900'>
      <span className='text-blue-700'>Task Manager</span>
      <Button />
      <ModeToggle />
    </div>
  )
}
