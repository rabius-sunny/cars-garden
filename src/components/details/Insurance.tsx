import { Accordion, Table, Tooltip } from '@mantine/core'
import { IconCheck, IconInfoCircle, IconX } from '@tabler/icons'
import { insurances } from 'static/details'

export default function Insurance() {
  return (
    <>
      <div className='font-extrabold flex items-center justify-between flex-wrap'>
        <h1 className='text-xl'>
          <span>Insurance - </span>
          <span className='text-primary'>for peace of mind</span>
        </h1>
        <div className='flex items-center text-primary gap-2 text-xl'>
          <IconCheck />
          <span>FREE cancellation</span>
          <Tooltip
            label='Full refund if you cancel your policy anytime before pick-up'
            color='cyan'
            transition='fade'
            radius='lg'
          >
            <IconInfoCircle />
          </Tooltip>
        </div>
      </div>

      <p className='mt-4'>
        Your car's zero-excess policy doesn't cover every kind of damage, or the
        other costs you might incur if something goes wrong. Why not add $31,200
        of Extra Cover - from CarsGarden.com?
      </p>
      <p className='mt-2'>
        T&Cs and standard exclusions apply. Please read:{' '}
        <span className='text-primary'>Policy Terms</span>
      </p>
      <div className='my-5'>
        <Table>
          <thead>
            <tr>
              <th>What is covered:</th>
              <th>No insurance</th>
              <th>
                <p className='text-center font-bold text-primary'>
                  Extra Cover
                </p>
                <p className='text-center'>Total cover price: $31.43</p>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <hr className='mt-4 mb-6' />
        <div className='bg-red-50 rounded-lg p-3 border-[1px] border-red-700 text-red-800 sm:p-4 flex items-center gap-3 sm:gap-4'>
          <IconInfoCircle stroke={0.9} />
          <div>
            <span className='font-extrabold'>Please note: </span> Your own car
            insurance is unlikely to cover hire cars.
          </div>
        </div>
      </div>
    </>
  )
}

const rows = insurances.map((item: any, idx: number) => (
  <tr key={idx}>
    <td>
      <Accordion
        styles={{
          item: { border: 'none' }
        }}
        chevronPosition='left'
      >
        <Accordion.Item value={item.control}>
          <Accordion.Control>{item.control}</Accordion.Control>
          <Accordion.Panel>{item.panel}</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </td>
    <td>
      <div className='w-full flex justify-center'>
        <IconX
          className='border-[1px] border-gray-300 p-1 rounded-full'
          color='gray'
        />
      </div>
    </td>
    <td>
      <div className='w-full text-center flex justify-center'>
        <IconCheck className='bg-primary text-white rounded-full p-1' />
      </div>
    </td>
  </tr>
))
