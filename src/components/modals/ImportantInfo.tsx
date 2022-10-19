import { Button, Modal } from '@mantine/core'
import {
  IconCarCrash,
  IconCreditCard,
  IconDashboard,
  IconInfoCircle,
  IconMapPin
} from '@tabler/icons'
import { useState } from 'react'

export default function ImportantInfo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant='light'
        color='cyan'
        onClick={() => setOpen(true)}
        className=' hover:bg-transparent md:hover:bg-lite p-0 md:p-2 hover:underline md:hover:no-underline'
      >
        <IconInfoCircle size={22} />
        <span className='pl-1 font-bold'>Important ack.</span>
      </Button>

      <Modal
        centered
        transition='fade'
        opened={open}
        onClose={() => setOpen(false)}
        size='xl'
        title={<div className='stroke'>Important acknowledgements</div>}
      >
        <div className='p-3 border-[1px] rounded-lg border-gray-200'>
          <div className='grid grid-cols-5'>
            <div className='col-span-5 md:col-span-2 flex gap-2'>
              <IconDashboard size={30} />
              <div>
                <h2 className='font-bold'>
                  Driver & licence{' '}
                  <span className='inline md:block'>requirements</span>
                </h2>
              </div>
            </div>
            <div className='col-span-5 md:col-span-3 text-gray-600'>
              <p className='font-semibold'>
                When you pick the car up, you'll need:
              </p>
              <ul className='ml-8'>
                <li className='list-disc'>Passport or NID card</li>
                <li className='list-disc'>Driving licence</li>
                <li className='list-disc'>Credit card</li>
              </ul>
            </div>
          </div>
          <hr className='my-3 md:my-4' />
          <div className='grid grid-cols-5'>
            <div className='col-span-5 md:col-span-2 flex gap-2'>
              <IconCreditCard size={30} />
              <div>
                <h2 className='font-bold'>Security Deposit</h2>
                <p className='text-gray-600'>US$300.00</p>
              </div>
            </div>
            <div className='col-span-5 md:col-span-3 text-gray-600'>
              At pick-up, the main driver will leave a refundable security
              deposit of US$300.00 on their credit card. Cash and debit cards
              are not accepted. The counter staff will confirm how much this
              will be.
              <p className='font-extrabold'>Accepted cards</p>
              <ul className='ml-8'>
                <li className='list-disc'>MasterCard</li>
                <li className='list-disc'>Visa</li>
              </ul>
            </div>
          </div>
          <hr className='my-3 md:my-4' />
          <div className='grid grid-cols-5'>
            <div className='col-span-5 md:col-span-2 flex gap-2'>
              <IconCarCrash size={30} />
              <div>
                <h2 className='font-bold'>Damage Excess</h2>
                <p className='text-gray-600'>US$0.00</p>
              </div>
            </div>
            <div className='col-span-5 md:col-span-3 text-gray-600'>
              If the car’s bodywork was damaged during your rental, you wouldn't
              pay anything at all towards repairs.This cover is only valid if
              you stick to the terms of the rental agreement. It doesn't cover
              other parts of the car (e.g. windows, wheels, interior or
              undercarriage), or charges (e.g. for towing or off-road time), or
              anything in the car (e.g. child seats, GPS devices or personal
              belongings).
            </div>
          </div>
          <hr className='my-3 md:my-4' />
          <div className='grid grid-cols-5'>
            <div className='col-span-5 md:col-span-2 flex gap-2'>
              <IconMapPin size={30} />
              <div>
                <h2 className='font-bold'>Mileage</h2>
                <p className='text-gray-600'>Unlimited</p>
              </div>
            </div>
            <div className='col-span-5 md:col-span-3 text-gray-600'>
              Your rental includes unlimited free kilometres.
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
