import {
  TextInput,
  Button,
  Box,
  Container,
  Title,
  Space,
  Loader
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import {
  IconAlertOctagon,
  IconTrademark,
  IconUser,
  IconUserCircle
} from '@tabler/icons'
import { useAppDispatch, useAppSelector } from 'hooks/useReduxHooks'
import { useEffect, useState } from 'react'
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import {
  resetAuthLoading,
  signinUser,
  signupUser
} from 'redux/slices/userSlice'
import { removeFrom } from 'redux/slices/utilSlice'

export default function User() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state)
  interface formData {
    name: string
    email: string
    phone: string
    phone2: string
    address: string
  }
  interface loginData {
    email: string
    password: string
  }
  const signupForm = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      phone2: '',
      address: '',
      password: ''
    },
    validate: {
      name: value => (value.length < 2 ? 'name is required' : null),
      email: value => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      phone: value => (value.length < 5 ? 'phone is required' : null),
      phone2: value =>
        value.length < 5 ? 'additional phone is required' : null,
      address: value => (value.length < 2 ? 'address is required' : null),
      password: value =>
        value.length < 4 ? 'length must be 4 or larger' : null
    }
  })
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
  const handleLogin = (values: loginData) => dispatch(signinUser(values))
  const handleSignup = (values: formData) => dispatch(signupUser(values))

  useEffect(() => {
    dispatch(resetAuthLoading())
  }, [])

  useEffect(() => {
    state.user.authLoading === 'error' &&
      showNotification({
        id: 'hello-there',
        autoClose: 5000,
        title: 'Error',
        message: 'Error in authenticating, try again',
        color: 'red',
        icon: <IconAlertOctagon size={25} />,
        className: 'my-notification-class',
        sx: { backgroundColor: '#ffb0b0' },
        loading: false
      })
    if (state.utils.from && state.user.userToken) {
      navigate(state.utils.from)
      dispatch(removeFrom())
    } else if (!state.utils.from && state.user.userToken) {
      navigate('/')
    }
  }, [state.user.authLoading])

  return (
    <Container size='sm'>
      <div className='border-2 py-12 px-4 mt-8 rounded-lg'>
        {isLogin ? (
          <Title order={1} mb={20} align='center' color='blue'>
            Sign in User
          </Title>
        ) : (
          <Title order={1} mb={20} align='center' color='blue'>
            Sign up User
          </Title>
        )}
        {isLogin ? (
          <Box sx={{ maxWidth: 300 }} mx='auto'>
            <form onSubmit={signinForm.onSubmit(values => handleLogin(values))}>
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
                {state.user.authLoading === 'pending' ? (
                  <Loader size='xs' color='white' />
                ) : (
                  'Log in'
                )}
              </Button>
            </form>
            <div className='flex mt-6 items-center justify-center'>
              <div className='bg-gray-600 h-[1px] w-24 mr-1'></div>
              or
              <div className='bg-gray-600 h-[1px] w-24 ml-1'></div>
            </div>
            <div className='mt-8 flex justify-center'>
              <button
                onClick={() => setIsLogin(false)}
                className='text-primary bg-lite hover:bg-indigo-200 text-lg flex items-center justify-center gap-4 rounded-3xl p-2 pr-3'
              >
                <IconUserCircle size={34} stroke={1.5} />
                <span>Create an account</span>
              </button>
            </div>
            <div className='mt-4 flex justify-center'>
              <button
                onClick={() => navigate('/login/supplier')}
                className='text-primary bg-lite hover:bg-indigo-200 text-lg flex items-center justify-center gap-4 rounded-3xl p-2 pr-3'
              >
                <IconTrademark
                  className='border-2 border-primary rounded-2xl'
                  size={30}
                />
                <span>Are you a supplier?</span>
              </button>
            </div>
          </Box>
        ) : (
          <Box sx={{ maxWidth: 300 }} mx='auto'>
            <form
              onSubmit={signupForm.onSubmit(values => handleSignup(values))}
            >
              <TextInput
                withAsterisk
                label='Company Name'
                {...signupForm.getInputProps('name')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Email'
                placeholder='you@email.com'
                {...signupForm.getInputProps('email')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Password'
                {...signupForm.getInputProps('password')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Phone no.'
                {...signupForm.getInputProps('phone')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Add. Phone no.'
                {...signupForm.getInputProps('phone2')}
              />
              <Space h='lg' />
              <TextInput
                withAsterisk
                label='Location'
                placeholder='street, zip, state, country'
                {...signupForm.getInputProps('address')}
              />

              <Button mt={20} type='submit'>
                {state.user.authLoading === 'pending' ? (
                  <Loader size='xs' color='white' />
                ) : (
                  'Sign up'
                )}
              </Button>
            </form>
            <div className='flex mt-6 items-center justify-center'>
              <div className='bg-gray-600 h-[1px] w-24 mr-1'></div>
              or
              <div className='bg-gray-600 h-[1px] w-24 ml-1'></div>
            </div>
            <div className='mt-8 flex justify-center'>
              <button
                onClick={() => setIsLogin(true)}
                className='text-primary bg-lite hover:bg-indigo-200 text-lg flex items-center justify-center gap-4 rounded-3xl p-2 pr-3'
              >
                <IconUser size={25} />
                <span>Login to yours</span>
              </button>
            </div>
            <div className='mt-4 flex justify-center'>
              <button
                onClick={() => navigate('/login/supplier')}
                className='text-primary bg-lite hover:bg-indigo-200 text-lg flex items-center justify-center gap-4 rounded-3xl p-2 pr-3'
              >
                <IconTrademark
                  className='border-2 border-primary rounded-2xl'
                  size={30}
                />
                <span>Are you a supplier?</span>
              </button>
            </div>
          </Box>
        )}
      </div>
    </Container>
  )
}
