export function ErrorPage() {
  return (
    <div className='box-border flex h-screen w-full flex-col items-center justify-center gap-3 bg-background p-4 text-muted-foreground'>
      <h2 className='text-3xl text-white/80'>Ops...&#128531;</h2>
      <p className='max-w-[400px] text-center'>
        Desculpe, tivemos um problema. Por favor, tente recarregar a página.
      </p>
    </div>
  )
}
