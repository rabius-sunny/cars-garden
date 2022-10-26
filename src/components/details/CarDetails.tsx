import {
  IconBrandTailwind,
  IconBriefcase,
  IconDoor,
  IconGauge,
  IconLocation,
  IconSettings,
  IconUser
} from '@tabler/icons'

export default function CarDetails({ data, location }: any) {
  return (
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
          <IconLocation stroke={1} size={20} /> <span>{location}</span>
        </div>
      </div>
    </div>
  )
}
