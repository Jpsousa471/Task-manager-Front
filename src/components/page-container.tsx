import type { PageContainerProps } from '@/interfaces/interfaces'

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className='flex min-h-screen w-full justify-center'>{children}</div>
  )
}
