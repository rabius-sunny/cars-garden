import { Avatar, Button, Modal, TextInput } from '@mantine/core'
import {
  IconBrandTailwind,
  IconBriefcase,
  IconDoor,
  IconGauge,
  IconLocation,
  IconMailForward,
  IconSettings,
  IconUser
} from '@tabler/icons'
import { useAppSelector } from 'hooks/useReduxHooks'
import { useState } from 'react'

export default function EmailQuote({ car }: any) {
  const [open, setOpen] = useState(false)
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
  const { location, days } = useAppSelector(state => state.rent)

  return (
    <>
      <Button
        variant='light'
        className=' hover:bg-transparent md:hover:bg-lite p-0 md:p-2 hover:underline md:hover:no-underline'
        color='cyan'
        onClick={() => setOpen(true)}
      >
        <IconMailForward size={22} />
        <span className='pl-1 font-bold'>Email quote</span>
      </Button>

      <Modal
        centered
        transition='rotate-right'
        opened={open}
        onClose={() => setOpen(false)}
        size='xl'
        title={<div className='stroke'>Email quote</div>}
      >
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-2 md:col-span-1'>
            <h1 className='text-3xl text-primary'>{name}</h1>
            <div className='my-3 flex items-center justify-between'>
              <div>
                <div className='mr-2 sm:mr-4 md:mr-8'>
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
              <div>
                <img src={image} alt='car' className='h-32 sm:h-3/4 md:h-28' />
              </div>
            </div>
            <div className='flex items-center justify-between mt-4'>
              <div className='flex items-center gap-2'>
                <Avatar color='orange' radius='xl' variant='filled'>
                  Br
                </Avatar>
                <h2 className='font-extrabold'>{suppliername}</h2>
              </div>
              <div className='pr-10 sm:pr-24 flex items-center'>
                <IconLocation size={18} className='text-gray-500 mr-1' />{' '}
                {location}
              </div>
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <h2 className='text-3xl font-extrabold'>Main driver's details</h2>
            <div className='text-gray-600'>
              <p className='mb-2'>As they appear on driving licence</p>
              <TextInput size='lg' mb={5} label='Email Address' />
              <TextInput size='lg' mb={5} label='Full Name' />
              <TextInput size='lg' label='Contact number' />
              <p>So we can call you if any problems come up</p>
              <hr className='my-4' />
              <div className='flex items-center justify-between'>
                <p className='font-extrabold text-lg'>
                  Price for {days || 1} days:
                </p>
                <p className='font-bold text-3xl'>
                  {'$'}
                  {charge * (days || 1)}
                </p>
              </div>
              <div className='mt-4'>
                <Button
                  onClick={() => setOpen(false)}
                  fullWidth
                  variant='filled'
                  className='bg-[#40C057]'
                >
                  Email quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
