import { Modal } from '@mantine/core'
import {
  IconArrowRight,
  IconBrandTailwind,
  IconBriefcase,
  IconDoor,
  IconGauge,
  IconLocation,
  IconSettings,
  IconUser
} from '@tabler/icons'
import dayjs from 'dayjs'

export default function BookingModal({ open, setOpen, data }: any) {
  return (
    <Modal
      centered
      transition='fade'
      opened={open}
      onClose={() => setOpen(false)}
      size='lg'
      title={<div className='font-extrabold text-lg'>Booking Information</div>}
      overflow='inside'
    >
      <p className='font-bold'>Car info</p>
      <hr />
      <div className='grid mt-6 grid-cols-4 gap-4'>
        <div className='col-span-2'>
          <img src={data?.car?.image} alt='' />
        </div>
        <div className='col-span-2'>
          <div className='mb-2'>
            <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-primary'>
              {data?.car?.name}
            </h1>
            <span className='text-xs text-gray-500 font-semibold'>
              or similar {data?.car?.type} car
            </span>
          </div>
          <div className='block sm:flex items-center'>
            <div className='mr-2 sm:mr-4 md:mr-8'>
              <div className='flex mt-1 gap-2 items-center text-sm'>
                <IconUser size={20} stroke={1.2} />
                {data?.car?.seats} seats
              </div>
              <div className='hidden sm:flex mt-1 gap-2 items-center text-sm'>
                <IconBriefcase size={20} stroke={1.2} />
                {data?.car?.largeBags} Large bags
              </div>
              <div className='flex mt-1 gap-2 items-center text-sm'>
                <IconDoor size={20} stroke={1.2} />
                {data?.car?.doors} doors
              </div>
            </div>
            <div>
              <div className='flex mt-1 gap-2 items-center text-sm'>
                <IconSettings size={20} stroke={1.2} />
                {data?.car?.gear}
              </div>
              <div className='hidden sm:flex mt-1 gap-2 items-center text-sm'>
                <IconBriefcase size={20} stroke={1.2} />
                {data?.car?.smallBags} Small bags
              </div>
              <div className='flex mt-1 gap-2 items-center text-sm'>
                {data?.car?.ac ? (
                  <IconBrandTailwind size={20} stroke={1.2} />
                ) : (
                  <IconGauge size={20} stroke={1.2} />
                )}
                {data?.car?.ac ? 'has A/C' : 'Unlimited mileage'}
              </div>
            </div>
          </div>
          <div className='flex items-center mt-4 mb-2 text-sm sm:text-lg text-primary font-semibold'>
            <IconLocation stroke={1} size={20} /> <span>{data?.location}</span>
          </div>
        </div>
      </div>
      <p className='font-bold mt-2'>Booking info</p>
      <hr />
      <div className='my-2'>
        <div className='flex items-center gap-4'>
          <div>
            <h2 className='font-bold'>{data?.location}</h2>
            <div>
              <span className='text-sm sm:text-md'>
                {dayjs(data?.fromdate).format('ddd DD MMM')}
              </span>
              {', '}
              <span className='text-sm sm:text-md'>{data?.picuptime}</span>
            </div>
          </div>
          <IconArrowRight size={22} stroke={1} />
          <div>
            <h2 className='font-bold'>{data?.location}</h2>
            <div>
              <span className='text-sm font-bold sm:text-md'>
                {dayjs(data?.todate).format('ddd DD MMM')}
              </span>
              {', '}
              <span className='text-sm font-bold sm:text-md'>
                {data?.dropofftime}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className='font-bold mt-4'>Payment & Docs</p>
      <hr />
      <div className='my-2'>
        <fieldset className='border-[1px] border-gray-200 p-3 sm:p-4 rounded-md'>
          <legend className='px-2'>Card</legend>
          <p>Name : {data?.cardHolderName}</p>
          <p>Card Number : {data?.cardNumber}</p>
          <p>Expiry Date : {data?.expiryDate}</p>
        </fieldset>
      </div>
      <div className='my-2'>
        <fieldset className='border-[1px] border-gray-200 p-3 sm:p-4 rounded-md'>
          <legend className='px-2'>Docs</legend>
          <p>
            Name : {data?.firstName} {data?.lastName}
          </p>
          <p>Email : {data?.email}</p>
          <p>Address : {data?.address}</p>
          <p>Phone : {data?.phone}</p>
        </fieldset>
      </div>
    </Modal>
  )
}
