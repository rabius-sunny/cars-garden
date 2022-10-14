import {
  Box,
  Button,
  Container,
  Loader,
  Space,
  TextInput,
  Title
} from '@mantine/core'
import { useForm } from '@mantine/form'

export default function CreateService() {
  const signinForm = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: value =>
        value.length > 4 ? null : 'length must be 4 or larger'
    }
  })
  return (
    <Container size={640} className='w-full'>
      <Title order={1} mb={20} align='center' color='red'>
        Create a Service
      </Title>

      <Box>
        <form onSubmit={signinForm.onSubmit(values => console.log(values))}>
          <TextInput
            withAsterisk
            label='Email'
            {...signinForm.getInputProps('email')}
          />
          <Space h='lg' />
          <TextInput
            withAsterisk
            label='Password'
            type='password'
            placeholder='********'
            {...signinForm.getInputProps('password')}
          />

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
