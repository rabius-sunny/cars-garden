import { Container, Grid } from '@mantine/core'
import { destinations, airports } from 'static/locations'

export default function Locations() {
  return (
    <section>
      <Container size='lg'>
        <div className='md:text-center mb-8'>
          <h2 className='text-lg font-semibold text-primary uppercase'>
            top locations
          </h2>
          <p className='mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
            Top worldwide destinations and airports
          </p>
        </div>
        <Grid>
          <Grid.Col span={12} sm={6}>
            <h1 className='text-2xl font-bold text-gray-600'>
              Top worldwide Destinations
            </h1>
            <div className='mt-1'>
              <Grid>
                <Grid.Col span={6}>
                  <ul className='pl-2'>
                    {destinations.slice(0, 5).map((item, idx) => (
                      <li
                        className='text-primary my-4 underline cursor-pointer'
                        key={idx}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Grid.Col>
                <Grid.Col span={6}>
                  <ul className='pl-2'>
                    {destinations.slice(5, 10).map((item, idx) => (
                      <li
                        className='text-primary my-4 underline cursor-pointer'
                        key={idx}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Grid.Col>
              </Grid>
            </div>
          </Grid.Col>
          <Grid.Col span={12} sm={6}>
            <h1 className='text-2xl font-bold text-gray-600'>
              Top worldwide Airports
            </h1>
            <div className='mt-1'>
              <Grid>
                <Grid.Col span={6}>
                  <ul className='pl-2'>
                    {airports.slice(0, 5).map((item, idx) => (
                      <li
                        className='text-primary my-4 underline cursor-pointer'
                        key={idx}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Grid.Col>
                <Grid.Col span={6}>
                  <ul className='pl-2'>
                    {airports.slice(5, 10).map((item, idx) => (
                      <li
                        className='text-primary my-4 underline cursor-pointer'
                        key={idx}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Grid.Col>
              </Grid>
            </div>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  )
}
