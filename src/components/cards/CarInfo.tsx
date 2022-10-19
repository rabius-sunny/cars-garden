import { Avatar, Button } from '@mantine/core'
import {
  IconBrandTailwind,
  IconBriefcase,
  IconChecks,
  IconDoor,
  IconGauge,
  IconLocation,
  IconSettings,
  IconUser
} from '@tabler/icons'
import EmailQuote from 'components/modals/EmailQuote'
import ImportantInfo from 'components/modals/ImportantInfo'
import { useAppSelector } from 'hooks/useReduxHooks'

export default function CarInfo({ car, search }: any) {
  const { days, location } = useAppSelector(state => state.rent)
  const {
    ac,
    charge,
    doors,
    gear,
    image,
    largeBags,
    name,
    seats,
    smallBags,
    supplier: { name: suppliername },
    type,
    _id
  } = car
  return (
    <div className='my-4 border-[1px] hover:ring-[2px] hover:ring-gray-300 border-gray-300 border-opacity-70 p-3 rounded-lg hover:shadow-lg hover:border-opacity-100'>
      <div className='flex flex-row-reverse md:flex-row justify-between'>
        {/* Image and mobile deal details */}
        <div>
          <img src={image} className='h-24 sm:h-36' />
          <div className='block md:hidden text-end'>
            <p className='text-gray-500 text-sm'>
              Price for <span className='font-bold'>{days || 1}</span> days:
            </p>
            <h1 className='text-2xl stroke font-extrabold'>
              {'$'}
              {charge * (days || 1)}
            </h1>
            <p className='text-[#1b8639] flex font-semibold items-center justify-end'>
              <IconChecks size={25} stroke={1.2} className='hidden sm:flex' />
              <span className='text-sm sm:text-md'>Free cancellation</span>
            </p>
            {search && (
              <div className='mt-2'>
                <Button color='blue' variant='filled' className='bg-primary'>
                  Deal details
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Name and feature details */}
        <div className=' w-1/2 sm:w-auto'>
          <div className='flex items-baseline flex-wrap gap-1 mb-2'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-primary'>
              {name}
            </h1>
            <span className='text-xs text-gray-500 font-semibold'>
              or similar {type} car
            </span>
          </div>

          {/* Feature details */}
          <div className='block sm:flex items-center'>
            <div className='mr-2 sm:mr-4 md:mr-8'>
              <div className='flex mt-1 gap-2 items-center'>
                <IconUser size={20} stroke={1.2} />
                {seats} seats
              </div>
              <div className='hidden sm:flex mt-1 gap-2 items-center'>
                <IconBriefcase size={20} stroke={1.2} />
                {largeBags} Large bags
              </div>
              <div className='flex mt-1 gap-2 items-center'>
                <IconDoor size={20} stroke={1.2} />
                {doors} doors
              </div>
            </div>
            <div>
              <div className='flex mt-1 gap-2 items-center'>
                <IconSettings size={20} stroke={1.2} />
                {gear}
              </div>
              <div className='hidden sm:flex mt-1 gap-2 items-center'>
                <IconBriefcase size={20} stroke={1.2} />
                {smallBags} Small bags
              </div>
              <div className='flex mt-1 gap-2 items-center'>
                {ac ? (
                  <IconBrandTailwind size={20} stroke={1.2} />
                ) : (
                  <IconGauge size={20} stroke={1.2} />
                )}
                {ac ? 'has A/C' : 'Unlimited mileage'}
              </div>
            </div>
          </div>
          <div className='mt-4 mb-2 text-sm sm:text-lg text-primary flex items-center justify-start md:justify-center font-semibold'>
            <IconLocation /> <span>{location}</span>
          </div>
        </div>

        {/* Medium device deal details */}
        <div className='hidden md:block self-end text-end'>
          <p className='text-gray-500 text-sm'>
            Price for <span className='font-bold'>{days || 1}</span> days:
          </p>
          <h1 className='text-3xl stroke font-extrabold'>
            {'$'}
            {charge * (days || 1)}
          </h1>
          <p className='text-[#1b8639] flex font-semibold items-center'>
            <IconChecks size={25} stroke={1.2} />
            <span>Free cancellation</span>
          </p>
          {search && (
            <div className='mt-4'>
              <Button color='blue' variant='filled' className='bg-primary'>
                Deal details
              </Button>
            </div>
          )}
        </div>
      </div>

      <hr className='my-4' />

      {/* Footer section */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar color='orange' radius='xl' variant='filled'>
            Br
          </Avatar>
          <h2 className='font-extrabold'>{suppliername}</h2>
        </div>
        <div className='flex flex-col sm:flex-row items-start md:items-center sm:gap-8'>
          <ImportantInfo />
          {search && <EmailQuote car={car} />}
        </div>
      </div>
    </div>
  )
}
