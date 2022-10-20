import { Container, Grid } from '@mantine/core'
import features from 'static/features'

export default function Features() {
  return (
    <div className='py-12'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='md:text-center'>
          <h2 className='text-lg font-bold text-primary uppercase'>features</h2>
          <p className='mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
            The best place for car hire
          </p>
          <p className='mt-4 max-w-2xl text-xl text-gray-500 md:mx-auto'>
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className='mt-10'>
          <dl className='space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:space-y-0'>
            {features.map(feature => (
              <div key={feature.name} className='relative'>
                <dt>
                  <div className='h-16 w-16 absolute'>
                    <img src={feature.image} className='' />
                  </div>
                  <p className='ml-20 text-lg font-medium leading-6 text-gray-900'>
                    {feature.name}
                  </p>
                </dt>
                <dd className='mt-2 ml-20 text-base text-gray-500'>
                  {feature.description}
                </dd>
                <hr className='mt-4 md:hidden' />
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Container mt={25} size='lg'>
        <Grid>
          <Grid.Col span={12} md={6}>
            <div className='flex flex-row-reverse md:flex-row items-start md:items-center w-full border-[1px] border-gray-200 rounded-lg p-4 gap-3 sm:gap-5'>
              <div>
                <img
                  src='/assets/images/clean.png'
                  className='h-16 w-28 md:h-auto md:w-auto'
                  alt='cleaner'
                />
              </div>
              <div>
                <h1 className='text-sm sm:text-xl font-extrabold'>
                  Clean cars. Flexible bookings. Socially distant rental
                  counters.
                </h1>
                <p>
                  We’re working with our partners to keep you safe and in the
                  driving seat.
                </p>
              </div>
            </div>
          </Grid.Col>
          <Grid.Col span={12} md={6}>
            <div className='flex flex-row-reverse md:flex-row items-start md:items-center w-full border-[1px] border-gray-200 rounded-lg p-4 gap-3 sm:gap-5'>
              <div>
                <img
                  src='/assets/images/mail.png'
                  className='h-16 w-28 md:h-auto md:w-auto'
                  alt='cleaner'
                />
              </div>
              <div>
                <h1 className='text-sm sm:text-xl font-extrabold mb-2'>
                  Subscribe for exclusive offers and deals!
                </h1>
                <form onSubmit={e => e.preventDefault()}>
                  <input
                    type='text'
                    placeholder='enter email address'
                    required
                    className='border-[1px] border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:border-0 focus:ring-primary'
                  />
                  <input
                    type='submit'
                    value='subscribe'
                    className='bg-primary py-[9px] sm:ml-2 mt-2 sm:mt-0 px-4 font-bold text-white rounded'
                  />
                </form>
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  )
}
