import { Loader } from '@mantine/core'

export default function CLoader() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Loader size='xl' variant='bars' />
    </div>
  )
}
