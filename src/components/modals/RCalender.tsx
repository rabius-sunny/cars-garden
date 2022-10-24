import { useState } from 'react'
import { RangeCalendar } from '@mantine/dates'
import { Button, Group, Modal, useMantineTheme } from '@mantine/core'
import { IconArrowNarrowRight, IconCalendar } from '@tabler/icons'
import dayjs from 'dayjs'
import { useAppDispatch, useAppSelector } from 'hooks/useReduxHooks'
import { addDays, addFromDate, addTodate } from 'redux/slices/rentSlice'

export default function RCalender({ error }: any) {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { fromdate, todate } = useAppSelector(state => state.rent)

  const onChange = (dates: any) => {
    setValue(dates)
    dispatch(addFromDate(dates[0]))
    dispatch(addTodate(dates[1]))
    if ((dates[0], dates[1] !== null)) {
      const bookingDate = dates[0]?.getTime()
      const returnDate = dates[1]?.getTime()
      if (bookingDate && returnDate) {
        const days = (returnDate - bookingDate) / 1000 / 60 / 60 / 24
        dispatch(addDays(days + 1))
      }
    }
  }

  const theme = useMantineTheme()

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`hover:bg-lite w-full bg-white py-[6px] px-4 text- text-start rounded shadow text-gray-600 ${
          error && 'ring-1 ring-[red]'
        }`}
      >
        <div className='flex items-center gap-4'>
          <IconCalendar size={30} />
          <div>
            <div>
              <span className='font-bold'>Choose Date</span>
            </div>
            {fromdate && todate ? (
              <div className='font-bold flex items-center gap-2 text-sm'>
                {dayjs(fromdate).format('ddd DD MMM')}{' '}
                <IconArrowNarrowRight size={22} />
                {dayjs(todate).format('ddd DD MMM')}
              </div>
            ) : (
              <div>select pic-up to drop-up date</div>
            )}
          </div>
        </div>
      </button>

      <Modal
        centered
        transition='fade'
        opened={open}
        onClose={() => setOpen(false)}
        size='auto'
        withCloseButton={false}
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <RangeCalendar
          allowLevelChange={false}
          value={value}
          onChange={dates => onChange(dates)}
        />
        <Group position='right'>
          <Button mt={5} onClick={() => setOpen(false)} className='bg-gray-600'>
            <span className='pl-1 font-bold'>OK</span>
          </Button>
        </Group>
      </Modal>
    </>
  )
}
