import { Container, Pagination } from '@mantine/core'
import CardSkeleton from 'components/cards/CardSkeleton'
import CarInfo from 'components/cards/CarInfo'
import useGet from 'hooks/useGet'

export default function Cars({ search }: any) {
  const { data, loading, success } = useGet('/cars')
  return (
    <>
      <Container size='sm' mt={16} mb={5}>
        <h1 className='text-primary font-bold text-4xl text-center'>
          Preferable Cars for your way
        </h1>
      </Container>
      <hr />
      <Container size='md' mt={20}>
        {loading && <CardSkeleton />}
        {success &&
          data?.map((item: object, idx: number) => (
            <div key={idx}>
              <CarInfo search={search} car={item} />
            </div>
          ))}
        {success && (
          <div className='flex justify-center mt-12'>
            <Pagination total={5} />
          </div>
        )}
      </Container>
    </>
  )
}
