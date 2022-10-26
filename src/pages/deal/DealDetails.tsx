import { Container, Progress, Skeleton } from '@mantine/core'
import { IconArrowLeft, IconArrowRight, IconCircleCheck } from '@tabler/icons'
import DealHeader from 'components/details/Header'
import { useNavigate, useParams } from 'react-router-dom'
import useGet from 'hooks/useGet'
import { useAppDispatch, useAppSelector } from 'hooks/useReduxHooks'
import ImportantInfo from 'components/modals/ImportantInfo'
import Features from 'components/details/Features'
import { choices, includes } from 'static/details'
import Insurance from 'components/details/Insurance'
import Cart from 'components/details/Cart'
import { addCover, removeCover } from 'redux/slices/rentSlice'
import CarDetails from 'components/details/CarDetails'

export default function DealDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const { data, loading } = useGet(`/car/${id}`, id)
  const { location } = useAppSelector(state => state.rent)

  const handleCheckout = (cover: boolean) => {
    if (cover) {
      dispatch(addCover())
      navigate(`/checkout/car/${data?.name}/${id}`)
    } else {
      dispatch(removeCover())
      navigate(`/checkout/car/${data?.name}/${id}`)
    }
  }

  return (
    <Container size='lg'>
      <header>
        <DealHeader />
      </header>
      <main>
        <div>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 cursor-pointer mt-6 bg-transparent text-primary'
          >
            <IconArrowLeft size={25} />
            <span>Back to Search Result</span>
          </button>
          <h1 className='stroke'>Your deal</h1>
          <p className='flex items-center gap-2'>
            Next <IconArrowRight size={18} stroke={0.9} /> Checkout
          </p>
        </div>
        <Progress mt={10} mb={10} value={50} />
        <div className='grid grid-cols-3 mt-6 gap-6'>
          <div className='col-span-3 md:col-span-2'>
            <div className='bg-green-100 rounded-lg p-3 border-[1px] border-green-700 text-green-800 sm:p-4 flex items-center gap-3 sm:gap-4'>
              <IconCircleCheck stroke={0.9} />
              <span>Free cancellation up to 48 hours before pick-up</span>
            </div>
            {loading && <Skeleton mt={20} height={250} />}
            {!loading && data && <CarDetails data={data} location={location} />}
            <hr className='mb-3' />
            <div className='flex items-center justify-between'>
              <div>{data?.supplier?.name}</div>
              <ImportantInfo />
            </div>
            <hr className='my-3' />
            <div className='mt-8'>
              <h1 className='text-xl font-bold mb-4'>Great Choice!</h1>
              <Features image data={choices} title='Great Choice!' index={3} />
            </div>
            <hr className='my-5' />
            <div className='mt-5'>
              <h1 className='text-xl font-bold mb-4'>Included in the price</h1>
              <Features data={includes} title='Great Choice!' index={2} />
            </div>
            <hr className='my-8' />
            <Insurance />
          </div>

          {/* Right Section */}
          <div className='col-span-3 md:col-span-1'>
            <Cart data={data} />
          </div>
        </div>
        <div className='md:grid md:grid-cols-3'>
          <div className='md:col-span-2'>
            <div className='mt-4 sm:flex gap-4 items-center justify-end'>
              <button
                onClick={() => handleCheckout(false)}
                className='bg-lite w-full md:w-auto mt-2 mb-1 hover:bg-primary hover:text-white text-primary py-2 px-4 rounded-md border-[1px] border-primary'
              >
                <p className='font-bold'>Go to book</p>
                <span>Without Extra Cover</span>
              </button>
              <button
                onClick={() => handleCheckout(true)}
                className='text-white w-full md:w-auto py-2 px-4 hover:bg-lite hover:text-primary rounded-md border-[1px] border-primary'
              >
                <p className='font-bold'>Go to book</p>
                <span>With Extra Cover</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </Container>
  )
}
