import { api } from '@/api/api'
import type { UpdatedTaskProps } from '@/interfaces/interfaces'

export async function updateTask({ updatedTask }: UpdatedTaskProps) {
  const response = await api.put(`/tasks/${updatedTask.id}`, {
    ...updatedTask
  })

  return response.data
}
