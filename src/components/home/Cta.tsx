import { Container } from '@mantine/core'
import { Link } from 'react-router-dom'

export default function Cta() {
  return (
    <section>
      <Container size='lg'>
        <div className=' bg-primary rounded-lg overflow-hidden py-8 md:py-16 px-8 relative'>
          <div className='w-full lg:w-2/3'>
            <h1 className='text-white text-2xl md:text-6xl font-extrabold'>
              Ready to drive? <br />
              Get set your backpack and start.
            </h1>
            <p className='text-gray-100 mt-2 sm:mt-4 mb-4 sm:mb-8'>
              Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
              Malesuada adipiscing sagittis vel nulla nec.
            </p>
            <Link
              to='/login/user'
              className='bg-white py-2 px-4 sm:py-3 font-bold sm:px-6 rounded-md'
            >
              Enter for a trip
            </Link>
          </div>
          <div className='hidden md:block'>
            <img
              src='/assets/images/cta.png'
              alt='cta'
              className='rounded-lg relative -bottom-20 right-[-223px]'
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
