import { TextInput, Button, Box, Container, Title, Space } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useAppDispatch } from 'hooks/redux'
import { useState } from 'react'
import { signupUser } from 'redux/userSlice'

export default function User() {
  const [isLogin, setIsLogin] = useState(true)
  const dispatch = useAppDispatch()
  interface formData {
    name: string
    email: string
    phone: string
    phone2: string
    location: string
  }
  interface loginData {
    email: string
    password: string
  }
  const signinForm = useForm({
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
  const signupForm = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  })
  const handleLogin = (values: loginData) => {
    console.log('values', values)
  }
  const handleSignup = (values: formData) => {
    dispatch(signupUser(values))
  }

  return (
    <Container size='sm'>
      <div className='border-2 py-12 px-4 mt-8 rounded-lg'>
        {isLogin ? (
          <Title order={1} mb={20} align='center' color='indigo'>
            Sign in User
          </Title>
        ) : (
          <Title order={1} mb={20} align='center' color='indigo'>
            Sign up User
          </Title>
        )}
        {isLogin ? (
          <Box sx={{ maxWidth: 300 }} mx='auto'>
            <form onSubmit={signupForm.onSubmit(values => handleLogin(values))}>
              <TextInput
                withAsterisk
                label='Email'
                {...signupForm.getInputProps('email')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Password'
                type='password'
                placeholder='********'
                {...signupForm.getInputProps('password')}
              />

              <Button mt={20} type='submit'>
                Log in
              </Button>
            </form>
            <div className='flex mt-6 items-center justify-center'>
              <div className='bg-gray-600 h-[1px] w-24 mr-1'></div>
              or
              <div className='bg-gray-600 h-[1px] w-24 ml-1'></div>
            </div>
            <div className='mt-8 text-center'>
              <button
                onClick={() => setIsLogin(false)}
                className='text-indigo-500 bg-transparent text-lg'
              >
                Create an account
              </button>
            </div>
          </Box>
        ) : (
          <Box sx={{ maxWidth: 300 }} mx='auto'>
            <form
              onSubmit={signinForm.onSubmit(values => handleSignup(values))}
            >
              <TextInput
                withAsterisk
                label='Company Name'
                {...signinForm.getInputProps('name')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Email'
                placeholder='you@email.com'
                {...signinForm.getInputProps('email')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Password'
                {...signinForm.getInputProps('password')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Phone no.'
                {...signinForm.getInputProps('phone')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Add. Phone no.'
                {...signinForm.getInputProps('phone2')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Location'
                placeholder='street, zip, state, country'
                {...signinForm.getInputProps('location')}
              />

              <Button mt={20} type='submit'>
                Sign Up
              </Button>
            </form>
            <div className='flex mt-6 items-center justify-center'>
              <div className='bg-gray-600 h-[1px] w-24 mr-1'></div>
              or
              <div className='bg-gray-600 h-[1px] w-24 ml-1'></div>
            </div>
            <div className='mt-8 text-center'>
              <button
                onClick={() => setIsLogin(true)}
                className='text-indigo-500 bg-transparent text-lg'
              >
                Login to yours
              </button>
            </div>
          </Box>
        )}
      </div>
    </Container>
  )
}
