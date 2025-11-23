import { X } from 'lucide-react'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Header } from './components/header'
import { PageContainer } from './components/page-container'
import { PageContent } from './components/page-content'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { useTasksContext } from './contexts/tasks-context'
import { Separator } from './components/ui/separator'
import { TaskCard } from './components/task-card'

export function App() {
  const { data } = useTasksContext()
  const [search, setSearch] = useState<string>('')

  if (!data) {
    return
  }

  const filteredTasks = search
    ? data.tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
      )
    : data.tasks

  const tasksCompleted = filteredTasks.filter(task => task.completed)
  const tasksPending = filteredTasks.filter(task => !task.completed)

  return (
    <PageContainer>
      <PageContent>
        <Header />
        {data.tasks.length > 0 && (
          <div className='my-5 flex w-full items-center gap-3'>
            <Label htmlFor='search-input'>Pesquisar</Label>
            <Input
              className='max-w-[400px]'
              id='search-input'
              onChange={e => setSearch(e.target.value)}
              value={search}
            />

            {search && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <X
                      className='cursor-pointer opacity-[0.5]'
                      onClick={() => setSearch('')}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Limpar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}

        {data.tasks.length < 1 && (
          <h2 className='mt-20 text-center font-semibold text-lg'>
            Você ainda não criou nenhuma tarefa &#128546; Aproveite e crie sua
            primeira terafa &#128515;
          </h2>
        )}

        {data.tasks.length > 0 && filteredTasks.length < 1 && (
          <h2 className='text-left font-semibold text-md'>
            Nenhuma tarefa foi encontrada para essa pesquisa
          </h2>
        )}

        {tasksPending.length > 0 && (
          <div className='flex items-center gap-3'>
            <h2>Pendentes</h2>
            <Separator />
          </div>
        )}

        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {tasksPending.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

          {tasksCompleted.length > 0 && (
          <div className='flex items-center gap-3 my-3'>
            <h2>Concluídas</h2>
            <Separator />
          </div>
        )}

         <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {tasksCompleted.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        
      </PageContent>
    </PageContainer>
  )
}
