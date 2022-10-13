import { TextInput, Button, Box, Container, Title, Space } from '@mantine/core'
import { useForm } from '@mantine/form'

export default function User() {
  interface formData {
    name: string
    email: string
    phone: string
    phone2: string
    location: string
  }
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      phone2: '',
      location: ''
    },
    validate: {
      name: value => (value.length < 2 ? 'name is required' : null),
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: value => (value.length < 5 ? 'phone is required' : null),
      phone2: value =>
        value.length < 5 ? 'additional phone is required' : null,
      location: value => (value.length < 2 ? 'location is required' : null)
    }
  })
  const handleSubmit = (values: formData) => {
    console.log('values', values)
  }
  return (
    <Container size='sm'>
      <div className='border-2 py-12 px-4 mt-8 rounded-lg'>
        <Title order={1} mb={10} align='center' color='indigo'>
          Sign In User
        </Title>
        <Box sx={{ maxWidth: 300 }} mx='auto'>
          <form onSubmit={form.onSubmit(values => handleSubmit(values))}>
            <TextInput
              withAsterisk
              label='Company Name'
              {...form.getInputProps('name')}
            />
            <Space h='lg' />
            <TextInput
              withAsterisk
              label='Email'
              placeholder='you@email.com'
              {...form.getInputProps('email')}
            />
            <Space h='lg' />
            <TextInput
              withAsterisk
              label='Phone no.'
              {...form.getInputProps('phone')}
            />
            <Space h='lg' />
            <TextInput
              withAsterisk
              label='Add. Phone no.'
              {...form.getInputProps('phone2')}
            />
            <Space h='lg' />
            <TextInput
              withAsterisk
              label='Location'
              placeholder='street, zip, state, country'
              {...form.getInputProps('location')}
            />

            <Button mt={10} type='submit'>
              Submit
            </Button>
          </form>
        </Box>
      </div>
    </Container>
  )
}
