import {
  IconBrandTailwind,
  IconBriefcase,
  IconDoor,
  IconGauge,
  IconMapPin,
  IconSettings,
  IconUser
} from '@tabler/icons'

export default function CarInfo({ car }: any) {
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
    supplier,
    type,
    _id
  } = car
  return (
    <div className=' my-4 flex gap-4 border-2 border-lite p-3 rounded-lg duration-200 hover:scale-105 hover:shadow-lg'>
      <div>
        <img src={image} className='h-28' />
      </div>
      <div className='md:mr-8'>
        <div className='flex items-baseline gap-1 mb-2'>
          <h1 className='text-xl font-bold text-primary'>{name}</h1>
          <span className='text-xs text-gray-500 font-semibold'>
            or similar {type} car
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='mr-8'>
            <div className='flex mt-1 gap-2 items-center'>
              <IconUser size={20} stroke={1.2} />
              {seats} seats
            </div>
            <div className='flex mt-1 gap-2 items-center'>
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
            <div className='flex mt-1 gap-2 items-center'>
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
        <div className='text-start md:text-center my-2 text-primary font-semibold'>
          Destination location
        </div>
      </div>
      <div className='hidden md:block self-end'>right</div>
    </div>
  )
}
