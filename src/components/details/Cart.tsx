import { Timeline } from '@mantine/core'
import { IconCheck, IconCurrentLocation, IconMapPin } from '@tabler/icons'
import dayjs from 'dayjs'
import { useAppSelector } from 'hooks/useReduxHooks'
import { choices } from 'static/details'

export default function Cart({ data, checkout }: any) {
  const { days, location, dropofftime, fromdate, picuptime, todate, cover } =
    useAppSelector(state => state.rent)

  return (
    <>
      <div className='p-3 rounded-lg border-[1px] border-gray-300'>
        <h1 className='font-extrabold text-xl'>Pick-up & drop-off</h1>
        <Timeline
          mt={18}
          styles={theme => ({
            itemTitle: {
              color: theme.colors.blue[6],
              fontWeight: 'bolder',
              fontSize: '1.2rem',
              marginBottom: 0
            }
          })}
          active={1}
          bulletSize={18}
          lineWidth={2}
        >
          <Timeline.Item bullet={<IconCurrentLocation />} title={location}>
            {dayjs(fromdate).format('ddd DD MMM')}, {picuptime}
          </Timeline.Item>
          <Timeline.Item bullet={<IconMapPin />} title={location}>
            {dayjs(todate).format('ddd DD MMM')}, {dropofftime}
          </Timeline.Item>
        </Timeline>
      </div>
      <div className='p-3 mt-4 rounded-lg border-[1px] border-gray-300'>
        <h1 className='font-extrabold text-xl mb-6'>Car price breakdown</h1>

        <div className='mb-2 flex items-center justify-between'>
          <p className='text-sm'>Car rental price</p>
          <p className='text-sm'>for 1 days</p>
          <p className='font-bold text-sm'>${data?.charge}</p>
        </div>
        <div className='mb-2 flex items-center justify-between'>
          <p className='text-sm'>You hired</p>
          <p className='text-sm'>for {days} days</p>
          <p className='font-bold text-sm'>
            ${parseInt(data?.charge) * (days || 1)}
          </p>
        </div>
        {cover && (
          <div className='mb-2 flex items-center justify-between'>
            <p className='text-sm'>With extra cover</p>
            <p className='font-bold text-sm'>$31.43</p>
          </div>
        )}
        <hr className='mt-4 mb-2' />
        <div className='flex items-center justify-between'>
          <p className='font-bold'>Total</p>
          <p className='font-bold'>
            {cover
              ? parseInt(data?.charge) * (days || 1) + 31.43
              : parseInt(data?.charge) * (days || 1)}
          </p>
        </div>
      </div>
      {checkout ? (
        <div className='mt-4 p-3 sm:p-4 rounded-lg border-[1px] border-gray-300'>
          <h2 className='font-bold text-lg mb-1'>Great choice!</h2>
          {choices.map((item, idx) => (
            <div key={idx} className='flex items-center gap-3 my-1'>
              <IconCheck color='green' />
              <span>{item}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className='mt-4 bg-green-100 p-3 sm:p-4 rounded-lg border-[1px] border-green-600'>
          <p className='font-bold'>
            This car is costing you just ${parseInt(data?.charge) * (days || 1)}{' '}
            – a real bargain…
          </p>
          <p>
            At that time of year, the average {data?.type} car at {location}{' '}
            costs $34355.08!
          </p>
        </div>
      )}
    </>
  )
}
