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

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface TaskCardProps {
  task: Task
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface NewTask {
  title: string
  description: string
  images: Array<string>
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface CreateNewTaskProps {
  task: NewTask
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface UpdatedTask {
  id: string
  title: string
  description: string
  // biome-ignore lint/style/useConsistentArrayType: <explanation>
  images: Array<string>
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface UpdatedTaskFormProps {
  task: UpdatedTask
  onClose: () => void
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface UpdatedTaskProps {
  updatedTask: UpdatedTask
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface DeleteTaskProps {
  taskId: string
}

// biome-ignore lint/style/useConsistentTypeDefinitions: <explanation>
export interface ChangeTaskCompletionProps {
  taskId: string
}
