import {
  Box,
  Button,
  Container,
  Loader,
  Select,
  Space,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useState } from 'react'

export default function CreateService() {
  const signinForm = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      password: value =>
        value.length > 4 ? null : 'length must be 4 or larger'
    }
  })
  const [gear, setGear] = useState<string | null>('auto')
  const [ac, setAc] = useState<string | null>('yes')
  const [type, setType] = useState<string | null>('small')

  return (
    <Container size={640} className='w-full'>
      <h1 className='text-2xl text-center md:text-start sm:text-5xl font-bold text-primary my-8'>
        Create a Service
      </h1>

      <Box>
        <form onSubmit={signinForm.onSubmit(values => console.log(values))}>
          <TextInput
            withAsterisk
            label='Car Name'
            {...signinForm.getInputProps('email')}
          />
          <Space h='lg' />
          <Select
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
            {...signinForm.getInputProps('email')}
          />
          <Space h='lg' />
          <TextInput
            withAsterisk
            label='Number of large bags'
            type='number'
            {...signinForm.getInputProps('email')}
          />
          <Space h='lg' />
          <TextInput
            withAsterisk
            label='Number of small bags'
            type='number'
            {...signinForm.getInputProps('email')}
          />
          <Space h='lg' />
          <TextInput
            withAsterisk
            label='Number of Doors'
            type='number'
            {...signinForm.getInputProps('email')}
          />
          <Space h='lg' />
          <Select
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
            label='Charge per day'
            {...signinForm.getInputProps('email')}
          />
          <Space h='lg' />

          <Button mt={20} type='submit'>
            {/*             {state.user.authLoading === 'pending' ? ( */}
            <Loader size='xs' color='white' />
            {/*            ) : (
              'Log in'
            )} */}
          </Button>
        </form>
      </Box>
    </Container>
  )
}
