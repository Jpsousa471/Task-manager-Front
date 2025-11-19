import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import logo from '../assets/logo-task-manager.png'
import { CreateTaskForm } from './create-task-form'
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

        <TooltipProvider>
          <Tooltip>
            <Dialog>
              <DialogTrigger>
                <TooltipTrigger>
                  <Button className='rounded-full' size='icon'>
                    <Plus className='text-white' />
                  </Button>
                </TooltipTrigger>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar</DialogTitle>
                  <DialogDescription>Criar nova tarefa</DialogDescription>
                </DialogHeader>

                <div className='grid gap-4 py-4'>
                  <div className='gaps-2 flex flex-col'>
                    <CreateTaskForm />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <TooltipContent className='text-white'>
              <p>Adicionar nova tarefa</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <ModeToggle />
      </div>
    </header>
  )
}
