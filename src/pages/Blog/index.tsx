import { Container } from '@mantine/core'
import BlogCard from './BlogCard'

export default function Blogs() {
  return (
    <Container size='lg'>
      <div className='bg-lite text-primary p-2 border-l-4 border-primary font-bold text-xl'>
        Read the awesome blogs
      </div>

      <div className='grid grid-cols-4 mt-12 gap-5'>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
          <div
            key={item}
            className='col-span-4 sm:col-span-2 xl:col-span-1 hover:scale-105 transition-all'
          >
            <BlogCard />
          </div>
        ))}
      </div>
    </Container>
  )
}
