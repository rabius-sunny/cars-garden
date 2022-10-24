import { IconArrowRight } from '@tabler/icons'
import dayjs from 'dayjs'
import { useAppSelector } from 'hooks/useReduxHooks'
import { useNavigate } from 'react-router-dom'

export default function DealHeader() {
  const navigate = useNavigate()
  const { location, picuptime, dropofftime, fromdate, todate } = useAppSelector(
    state => state.rent
  )
  return (
    <div className='mt-4 block sm:flex items-center justify-between border-primary border-2 p-4 rounded-lg'>
      <div className='flex justify-between items-center gap-4'>
        <div>
          <h2 className='sm:text-xl font-extrabold'>{location}</h2>
          <div>
            <span className='text-sm font-bold sm:text-md'>
              {dayjs(fromdate).format('ddd DD MMM')}
            </span>
            {', '}
            <span className='text-sm font-bold sm:text-md'>{picuptime}</span>
          </div>
        </div>
        <IconArrowRight size={22} />
        <div>
          <h2 className='sm:text-xl font-extrabold'>{location}</h2>
          <div>
            <span className='text-sm font-bold sm:text-md'>
              {dayjs(todate).format('ddd DD MMM')}
            </span>
            {', '}
            <span className='text-sm font-bold sm:text-md'>{dropofftime}</span>
          </div>
        </div>
      </div>
      <div className='mt-3 sm:mt-0'>
        <button
          onClick={() => navigate('/')}
          className='w-full bg-primary px-3 py-2 text-white font-semibold rounded'
        >
          Edit
        </button>
      </div>
    </div>
  )
}
