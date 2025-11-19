/** biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: <explanation> */
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { Loader } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { useTasksContext } from '@/contexts/tasks-context'
import type { NewTask } from '@/interfaces/interfaces'
import { cn } from '@/lib/utils'
import { createNewTask } from '@/routes/create-new-task'
import { images } from '@/utils/images'
import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'

export function CreateTaskForm() {
  const { refetchTaskData } = useTasksContext()
  const minCharacteresOfTitle = 3
  const maxCharacteresOfTitle = 25
  const minDescription = 10
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')

  const formSchema = z.object({
    title: z
      .string()
      .min(minCharacteresOfTitle, {
        message: `O título deve conter pelo menos ${minCharacteresOfTitle} caracteres`
      })
      .max(maxCharacteresOfTitle, {
        message: `O título está muito longo. Ele deve conter no máximo ${maxCharacteresOfTitle} caracteres`
      }),
    description: z.string().min(minDescription, {
      message: `A descrição deve conter o mínimo de ${minDescription} caracteres`
    }),
    images: z
      .array(z.string().url())
      .min(1, { message: 'Associe no mínimo uma imagem à essa tarefa.' })
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      images: []
    }
  })

  const resetForm = () => {
    form.reset()
  }

  const handleSubmit = (formData: NewTask) => {
    createTaskRequest({ task: formData })
  }

  const {
    mutate: createTaskRequest,
    isPending,
    isError
  } = useMutation({
    mutationFn: createNewTask,
    onSuccess: () => {
      toast.success('Nova tarefa criada com sucesso')
      resetForm()
      refetchTaskData?.()
    },
    onError: (error: AxiosError) => {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error(error)
      setErrorMessage(error.response?.statusText)
      toast.error('Erro ao criar tarefa')
    }
  })

  return (
    <div className='w-full'>
      <Form {...form}>
        <form className='spacce-y-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='task-title'>Título</FormLabel>
                <FormControl>
                  <Input
                    id='task-title'
                    placeholder='Título da tarefa...'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='task-description'>Descrição</FormLabel>
                <FormControl>
                  <Input
                    id='task-description'
                    placeholder='Descrição da tarefa...'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='images'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagesn Associadas</FormLabel>
                <FormControl>
                  <div className='grid grid-cols-4 gap-4'>
                    {images.map((image, index) => {
                      const isSelected = (field.value as string[])?.includes(
                        image
                      )
                      return (
                        // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                        <div
                          className={cn(
                            'relative cursor-pointer overflow-hidden rounded-md border-2 transition-colors',
                            isSelected
                              ? 'border-4 border-primary'
                              : 'border-gray-300 hover:border-gray-400'
                          )}
                          key={image}
                          onClick={() => {
                            if (isSelected) {
                              field.onChange(
                                field.value.filter(img => img !== image)
                              )
                            } else {
                              field.onChange([...(field.value || []), image])
                            }
                          }}
                        >
                          {/** biome-ignore lint/correctness/useImageSize: <explanation> */}
                          <img
                            alt={`Imagem ${index + 1}`}
                            className='h-24 w-full object-cover'
                            src={image}
                          />
                        </div>
                      )
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex w-full justify-end gap-3'>
            <Button
              className='uppercase'
              onClick={resetForm}
              type='button'
              variant='secondary'
            >
              Limpar
            </Button>

            <Button
              className='w-[170px font-semibold uppercase'
              disabled={isPending}
              onClick={form.handleSubmit(handleSubmit)}
              type='submit'
            >
              {isPending ? <Loader className='animate-spin' /> : 'Criar terefa'}
            </Button>
          </div>
          {isError && errorMessage && (
            <p className='font-medium text-[0.8rem] text-red-500'>
              {`Erro ao criar nova tarefa. Erro:${errorMessage}`}
            </p>
          )}
        </form>
      </Form>
    </div>
  )
}
