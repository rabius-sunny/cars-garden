import { Container, Skeleton } from '@mantine/core'
import useGet from 'hooks/useGet'
export default function Brands() {
  const { data, loading } = useGet('/get-brands')
  console.log('data', data)
  return (
    <section>
      <Container size='lg'>
        <h1 className='font-extrabold text-center text-2xl md:text-4xl text-primary'>
          Cars Garden{' '}
          <span className='text-black'>
            connects you to the biggest brands in car hire.
          </span>
        </h1>
        {loading && <Skeleton height={35} mt={10} />}
        {!loading && (
          <div className='mt-5'>
            <div className='flex items-center flex-wrap justify-between'>
              {data?.map((item: any, idx: number) => (
                <div className='' key={idx}>
                  <img src={item?.brand} className='w-28' alt='brand image' />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
