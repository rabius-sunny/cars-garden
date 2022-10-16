import { Box, Button, Container, Select, Space, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconAlertOctagon } from '@tabler/icons'
import DropZone from 'components/shared/DropZone'
import { useAppDispatch, useAppSelector } from 'hooks/useReduxHooks'
import useToken from 'hooks/useToken'
import { useState } from 'react'
import { removeCarImage } from 'redux/slices/supSlice'
import requests from 'services/http'

export default function CreateService() {
  const { carImage: image, imageStatus: status } = useAppSelector(
    state => state.sup
  )
  const dispatch = useAppDispatch()
  const [gear, setGear] = useState<string | null>('auto')
  const [ac, setAc] = useState<string | null>('yes')
  const [type, setType] = useState<string | null>('small')
  const [loading, setLoading] = useState(false)
  const config = useToken()

  const signinForm = useForm({
    initialValues: {
      name: '',
      seats: '',
      largeBags: '',
      smallBags: '',
      doors: '',
      charge: ''
    },
    validate: {
      name: value => (value.length > 2 ? null : 'name is required'),
      seats: value => (value.length ? null : 'seats info is required'),
      largeBags: value => (value.length ? null : 'large bags info is required'),
      smallBags: value => (value.length ? null : 'small bags info is required'),
      doors: value => (value.length ? null : 'doors info is required'),
      charge: value => (value.length ? null : 'charge rate is required')
    }
  })

  const handleSubmit = (values: object) => {
    setLoading(true)
    const data = { ...values, gear, ac, type, image }
    requests
      .post('/cars', data, config)
      .then(data => {
        if (data.message === 'ok') {
          signinForm.reset()
          dispatch(removeCarImage())
          setLoading(false)
          window.scrollTo({ top: 80, behavior: 'smooth' })
          showNotification({
            id: 'hello-there',
            autoClose: 5000,
            title: 'Error',
            message: 'Successfully created a service',
            color: 'green',
            icon: <IconAlertOctagon size={25} />,
            className: 'my-notification-class',
            sx: { backgroundColor: '#00e484' },
            loading: false
          })
        }
      })
      .catch(err => {
        setLoading(false)
        showNotification({
          id: 'hello-there',
          autoClose: 5000,
          title: 'Error',
          message: err.response.data.message,
          color: 'red',
          icon: <IconAlertOctagon size={25} />,
          className: 'my-notification-class',
          sx: { backgroundColor: '#ffb0b0' },
          loading: false
        })
      })
  }

  return (
    <Container size={640} className='w-full'>
      <h1 className='text-2xl text-center md:text-start sm:text-5xl font-bold text-primary my-8'>
        Create a Service
      </h1>

      <Box>
        <form onSubmit={signinForm.onSubmit(values => handleSubmit(values))}>
          <TextInput
            withAsterisk
            label='Car Name'
            {...signinForm.getInputProps('name')}
          />
          <Space h='lg' />
          <Select
            withAsterisk
            label='Select type'
            value={type}
            onChange={setType}
            data={[
              { value: 'small', label: 'SMALL' },
              { value: 'medium', label: 'MEDIUM' },
              { value: 'large', label: 'LARGE' },
              { value: 'premium', label: 'PREMIUM' }
            ]}
          />
          <Space h='lg' />
          <Space h='lg' />
          <TextInput
            withAsterisk
            label='Number of Seats'
            type='number'
            {...signinForm.getInputProps('seats')}
          />
          <Space h='lg' />
          <TextInput
            withAsterisk
            label='Number of large bags'
            type='number'
            {...signinForm.getInputProps('largeBags')}
          />
          <Space h='lg' />
          <TextInput
            withAsterisk
            label='Number of small bags'
            type='number'
            {...signinForm.getInputProps('smallBags')}
          />
          <Space h='lg' />
          <TextInput
            withAsterisk
            label='Number of Doors'
            type='number'
            {...signinForm.getInputProps('doors')}
          />
          <Space h='lg' />
          <Select
            withAsterisk
            label='Select gear type'
            value={gear}
            onChange={setGear}
            data={[
              { value: 'auto', label: 'AUTO' },
              { value: 'manual', label: 'MANUAL' }
            ]}
          />
          <Space h='lg' />
          <Select
            withAsterisk
            label='A/C status'
            value={ac}
            onChange={setAc}
            data={[
              { value: 'yes', label: 'HAS A/C' },
              { value: 'no', label: 'NO A/C' }
            ]}
          />
          <Space h='lg' />
          <TextInput
            withAsterisk
            label='Charge per day (in dolor)'
            type='number'
            {...signinForm.getInputProps('charge')}
          />
          <Space h='lg' />
          <DropZone />
          <Space h='lg' />

          <Button
            disabled={status === 'pending' || loading}
            mt={20}
            type='submit'
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  )
}
