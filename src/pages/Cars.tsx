import { Container } from '@mantine/core'
import CardSkeleton from 'components/cards/CardSkeleton'
import CarInfo from 'components/cards/CarInfo'
import useGet from 'hooks/useGet'

export default function Cars() {
  const { data, error, loading, success } = useGet('/cars')
  console.log('info', loading, error, data)
  return (
    <>
      <Container size='sm' mt={16} mb={5}>
        <h1 className='text-primary font-bold text-4xl text-center'>
          Preferable Cars for your way
        </h1>
      </Container>
      <hr />
      <Container size='sm' mt={16}>
        {loading && <CardSkeleton />}
        {success &&
          data?.map((item: object, idx: number) => (
            <div key={idx}>
              <CarInfo car={item} />
            </div>
          ))}
      </Container>
    </>
  )
}
