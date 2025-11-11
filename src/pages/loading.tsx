import { Loader } from 'lucide-react'

export function Loading() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 bg-background text-muted-foreground'>
      <Loader className='animate-spin' size={30} />
      <p>Estamos preparando tudo...</p>
    </div>
  )
}
