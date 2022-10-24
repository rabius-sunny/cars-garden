import { useState } from 'react'
import { Container, Progress, Skeleton, Tooltip } from '@mantine/core'
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandTailwind,
  IconBriefcase,
  IconCheck,
  IconCircleCheck,
  IconDoor,
  IconGauge,
  IconInfoCircle,
  IconLocation,
  IconSettings,
  IconUser
} from '@tabler/icons'
import DealHeader from 'components/details/Header'
import { useNavigate, useParams } from 'react-router-dom'
import useGet from 'hooks/useGet'
import { useAppSelector } from 'hooks/useReduxHooks'
import ImportantInfo from 'components/modals/ImportantInfo'
import Features from 'components/details/Features'
import { choices, includes } from 'static/details'
import Insurance from 'components/details/Insurance'

export default function DealDetails() {
  const navigate = useNavigate()
  const [value, setValue] = useState(50)
  const { id } = useParams()

  const { data, loading } = useGet(`/car/${id}`, id)
  const { days, location } = useAppSelector(state => state.rent)

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
        <Progress mt={10} mb={10} value={value} />
        <div className='grid grid-cols-3 mt-6 gap-6'>
          <div className='col-span-3 md:col-span-2'>
            <div className='bg-green-100 rounded-lg p-3 border-[1px] border-green-700 text-green-800 sm:p-4 flex items-center gap-3 sm:gap-4'>
              <IconCircleCheck stroke={0.9} />
              <span>Free cancellation up to 48 hours before pick-up</span>
            </div>
            {loading && <Skeleton mt={20} height={250} />}
            {!loading && data && (
              <div className='grid mt-6 grid-cols-4 gap-4'>
                <div className='col-span-1'>
                  <img src={data?.image} alt='' />
                </div>
                <div className='col-span-3'>
                  <div className='mb-2'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-primary'>
                      {data?.name}
                    </h1>
                    <span className='text-xs text-gray-500 font-semibold'>
                      or similar {data?.type} car
                    </span>
                  </div>
                  <div className='block sm:flex items-center'>
                    <div className='mr-2 sm:mr-4 md:mr-8'>
                      <div className='flex mt-1 gap-2 items-center'>
                        <IconUser size={20} stroke={1.2} />
                        {data?.seats} seats
                      </div>
                      <div className='hidden sm:flex mt-1 gap-2 items-center'>
                        <IconBriefcase size={20} stroke={1.2} />
                        {data?.largeBags} Large bags
                      </div>
                      <div className='flex mt-1 gap-2 items-center'>
                        <IconDoor size={20} stroke={1.2} />
                        {data?.doors} doors
                      </div>
                    </div>
                    <div>
                      <div className='flex mt-1 gap-2 items-center'>
                        <IconSettings size={20} stroke={1.2} />
                        {data?.gear}
                      </div>
                      <div className='hidden sm:flex mt-1 gap-2 items-center'>
                        <IconBriefcase size={20} stroke={1.2} />
                        {data?.smallBags} Small bags
                      </div>
                      <div className='flex mt-1 gap-2 items-center'>
                        {data?.ac ? (
                          <IconBrandTailwind size={20} stroke={1.2} />
                        ) : (
                          <IconGauge size={20} stroke={1.2} />
                        )}
                        {data?.ac ? 'has A/C' : 'Unlimited mileage'}
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center mt-4 mb-2 text-sm sm:text-lg text-primary font-semibold'>
                    <IconLocation stroke={1} size={20} />{' '}
                    <span>{location}</span>
                  </div>
                </div>
              </div>
            )}
            <hr className='mb-3' />
            <div className='flex items-center justify-between'>
              <div>{data?.supplier?.name}</div>
              <ImportantInfo />
            </div>
            <hr className='my-3' />
            <div className='mt-8'>
              <h1 className='text-xl font-bold mb-4'>Great Choice!</h1>
              <Features data={choices} title='Great Choice!' index={3} />
            </div>
            <hr className='my-5' />
            <div className='mt-5'>
              <h1 className='text-xl font-bold mb-4'>Included in the price</h1>
              <Features data={includes} title='Great Choice!' index={2} />
            </div>
            <hr className='my-8' />
            <Insurance />
            <div className='mt-4 flex gap-4 items-center justify-end'>
              <button
                onClick={() => setValue(100)}
                className='bg-lite hover:bg-primary hover:text-white text-primary py-2 px-4 rounded-md border-[1px] border-primary'
              >
                <p className='font-bold'>Go to book</p>
                <span>Without Extra Cover</span>
              </button>
              <button
                onClick={() => setValue(100)}
                className='text-white py-2 px-4 hover:bg-lite hover:text-primary rounded-md border-[1px] border-primary'
              >
                <p className='font-bold'>Go to book</p>
                <span>With Extra Cover</span>
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className='col-span-3 md:col-span-1'>
            <div className='p-3 rounded-lg border-[1px] border-gray-300'>
              <h1 className='font-extrabold text-xl'>Pick-up & drop-off</h1>
            </div>
          </div>
        </div>
      </main>
    </Container>
  )
}
