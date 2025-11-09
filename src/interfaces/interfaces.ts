import type { ReactNode } from 'react'

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface PageContainerProps {
  children: ReactNode
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface PageContentProps {
  children: ReactNode
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface Task {
  _id: string
  id: string
  title: string
  description: string
  completed: boolean
  images: [string]
  createdAt: Date
  updatedAt: Date
  __v: number
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface TaskData {
  // biome-ignore lint/style/useConsistentArrayType: <explanation>
  tasks: Array<Task>
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface ContextProps {
  isLoading?: boolean
  isError?: boolean
  data?: TaskData
  refetchTaskData?: () => void
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface ContextProviderProps {
  children: ReactNode
}
