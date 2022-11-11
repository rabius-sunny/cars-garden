import {
  Skeleton,
  Container,
  createStyles,
  Text,
  UnstyledButton
} from '@mantine/core'
import BookingModal from 'components/modals/BookingModal'
import useGet from 'hooks/useGet'
import useToken from 'hooks/useToken'
import { useState } from 'react'

const useStyles = createStyles(theme => ({
  title: {
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    border: '1px solid lightgray',
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)'
    }
  }
}))

export default function MyBooking() {
  const { classes } = useStyles()
  const config = useToken()
  const { data, loading } = useGet('/booking', '', config)
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<any>(null)

  const handleShow = (data: any) => {
    setCurrent(data)
    setOpen(true)
  }

  const items = data?.map((item: any, idx: number) => (
    <UnstyledButton
      key={idx}
      onClick={() => handleShow(item)}
      className={classes.item}
    >
      <img src={item?.car?.image} alt='booking car' />
      <Text size='sm' mt={7} className={classes.title}>
        {item?.car?.name}
      </Text>
    </UnstyledButton>
  ))

  return (
    <Container size='sm' className='w-full'>
      <BookingModal open={open} setOpen={setOpen} data={current} />
      <h1 className='text-2xl text-center sm:text-5xl font-bold text-primary my-8'>
        My Booking
      </h1>
      <hr className='mb-8' />
      {loading && (
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-2 sm:col-span-1'>
            <Skeleton height={250} />
          </div>
          <div className='col-span-2 sm:col-span-1'>
            <Skeleton height={250} />
          </div>
        </div>
      )}
      {!loading && !data?.length && (
        <p className='text-center text-red-500 font-bold text-xl'>
          No booking data yet
        </p>
      )}
      <div className='grid grid-cols-2 gap-4'>
        {data?.map((i: any, idx: number) => (
          <div className='col-span-2 sm:col-span-1' key={idx}>
            {items}
          </div>
        ))}
      </div>
    </Container>
  )
}
