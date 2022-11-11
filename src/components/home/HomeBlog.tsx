import { Container } from '@mantine/core'
import BlogCard from 'pages/Blog/BlogCard'
import { Link } from 'react-router-dom'

export default function HomeBlog() {
  return (
    <section>
      <Container size='lg'>
        <div className='text-center'>
          <h2 className='text-lg font-semibold text-primary uppercase'>
            blogs
          </h2>
          <p className='mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
            Read our awesome blogs
          </p>
          <div className='grid grid-cols-4 mt-12 gap-5'>
            {[1, 2, 3, 4].map(item => (
              <div
                key={item}
                className='col-span-4 sm:col-span-2 xl:col-span-1 hover:scale-105 transition-all'
              >
                <BlogCard />
              </div>
            ))}
          </div>
          <div className='text-center mt-8'>
            <Link to='/blogs' className='text-primary font-bold text-xl'>
              See more...
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
