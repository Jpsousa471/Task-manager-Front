import { useQuery } from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import type {
  ContextProps,
  ContextProviderProps
} from '@/interfaces/interfaces'
import { ErrorPage } from '@/pages/error-page'
import { Loading } from '@/pages/loading'
import { getAllTasks } from '@/routes/get-all-task'

const StateContext = createContext<ContextProps>({})

export const TasksDataContextProvider = ({
  children
}: ContextProviderProps) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['taskData'],
    queryFn: getAllTasks,
    staleTime: 60_000
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(error)
    return <ErrorPage />
  }

  if (!data) {
    return
  }

  return (
    <StateContext.Provider
      value={{
        data,
        isLoading,
        isError,
        refetchTaskData: refetch
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useTasksContext = () => useContext(StateContext)
