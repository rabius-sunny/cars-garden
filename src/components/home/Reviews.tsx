import { Carousel } from '@mantine/carousel'
import { useRef } from 'react'
import { Container } from '@mantine/core'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons'
import Autoplay from 'embla-carousel-autoplay'
import reviews from 'static/reviwes'

export default function Reviews() {
  const autoplay = useRef(Autoplay({ delay: 2000 }))

  return (
    <Container size='lg'>
      <section className='bg-primary rounded-lg px-4 pt-16 pb-20'>
        <h2 className='text-center text-lg font-semibold text-white uppercase'>
          reviews
        </h2>
        <h1 className='text-center mb-8 text-3xl md:text-5xl text-white font-bold'>
          What customers say about us
        </h1>
        <Carousel
          withIndicators
          height='100%'
          slideSize='auto'
          align='start'
          nextControlIcon={<IconArrowRight className=' shadow-lg' size={16} />}
          previousControlIcon={
            <IconArrowLeft className=' shadow-lg' size={16} />
          }
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          loop
          styles={{
            indicator: {
              width: 12,
              height: 4,
              transition: 'width 250ms ease',

              '&[data-active]': {
                width: 40
              }
            }
          }}
        >
          {reviews.map((item, idx) => (
            <Carousel.Slide
              key={idx}
              className='bg-white rounded-lg px-2 py-3 mx-2 md:mx-4 w-80 flex items-start gap-2'
            >
              <div className='w-36'>
                <img src={item.photo} alt='reviewer' className='rounded-full' />
              </div>
              <div>
                <h1 className='text-lg font-bold text-gray-500'>{item.name}</h1>
                <p className='text-gray-500 text-sm -mt-2'>
                  CEO @{item.company}
                </p>
                <p className='text-gray-600 text-sm'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Dolores, libero disit amero aphixedium.
                </p>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </section>
    </Container>
  )
}
