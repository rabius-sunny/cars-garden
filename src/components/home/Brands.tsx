import { Container } from '@mantine/core'
export default function Brands() {
  return (
    <section>
      <Container>
        <h1 className='font-extrabold text-center text-5xl text-primary'>
          Cars Garden{' '}
          <span className='text-black'>
            connects you to the biggest brands in car hire.
          </span>
        </h1>
        <div className='mt-10'>
          <div className='flex items-center flex-wrap justify-between'>
            {[1, 2, 3, 4].map((item, idx) => (
              <div className='' key={idx}>
                <h2 className='stroke'>brand</h2>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
