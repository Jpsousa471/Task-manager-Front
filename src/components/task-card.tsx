import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { CheckCircle, Circle, Edit, Trash } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useTasksContext } from '@/contexts/tasks-context'
import type { TaskCardProps } from '@/interfaces/interfaces'
import { changeTaskCompletion } from '@/routes/change-task-completion'
import { deleteTask } from '@/routes/delete-task'
import { Button } from './ui/button'
import { Toggle } from './ui/toggle'
import { UpdateTaskForm } from './update-task-form'

export function TaskCard({ task }: TaskCardProps) {
  const { refetchTaskData } = useTasksContext()

  const { mutate: changeTaskCompletionRequest } = useMutation({
    mutationFn: changeTaskCompletion,
    onSuccess: () => {
      toast.success('Tarefa concluída com sucesso')
      refetchTaskData?.()
    },
    onError: (error: AxiosError) => {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(error)
      toast.error('Erro ao concluir tarefa tarefa')
    }
  })

  const { mutate: deleteTaskRequest } = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success('Tarefa deletada com sucesso')
      refetchTaskData?.()
    },
    onError: (error: AxiosError) => {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(error)
      toast.error('Erro ao deletar tarefa')
    }
  })

  const [updateDialogIsOpen, setUpdateDialogIsOpen] = useState<boolean>(false)

  const handleDeleteTask = () => {
    deleteTaskRequest({ taskId: task.id })
  }

  const handleChangeTaskCompletion = () => {
    changeTaskCompletionRequest({ taskId: task.id })
  }

  return (
    <Card
      className={`w-full max-w-[400px] ${task.completed ? 'border-primary' : 'border-red-800'}`}
    >
      <div className='absolute top-2 right-2 flex items-center gap-3'>
        <Dialog onOpenChange={setUpdateDialogIsOpen} open={updateDialogIsOpen}>
          <DialogTrigger asChild>
            <Button size='icon' variant='ghost'>
              <Edit />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edite as informações da sua tarefa</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='flex flex-col gap-2'>
                <UpdateTaskForm
                  onClose={() => setUpdateDialogIsOpen(false)}
                  task={task}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size='icon' variant='ghost'>
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja deletar essa tarefa?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta ação não podera ser desfeita futuramente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className='hover: bg-destructive bg-destructive/90 text-white'
                onClick={handleDeleteTask}
              >
                Deletar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <CardHeader className='mt-2'>
        <CardTitle>
          <p className='max-w-[80%] leading-tight'>{task.title}</p>
        </CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent className='flex justify-center'>
        <Carousel className='w-full'>
          <CarouselContent>
            {task.images.map(image => (
              <CarouselItem key={image}>
                <div>
                  {/** biome-ignore lint/correctness/useImageSize: <explanation> */}
                  <img
                    alt={`Imagem asssociada á tarefa: ${task.title}`}
                    className='h-[150px] w-full'
                    src={image}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute top-1/2 left-0' />
          <CarouselNext className='absolute top-1/2 right-0' />
        </Carousel>
      </CardContent>
      <CardFooter className='flex justify-center'>
        <Toggle
          onPressedChange={handleChangeTaskCompletion}
          pressed={task.completed}
        >
          {task.completed ? <CheckCircle /> : <Circle />}
          {task.completed ? 'Marcar com pendente' : 'Marcar com concluída'}
        </Toggle>
      </CardFooter>
    </Card>
  )
}
