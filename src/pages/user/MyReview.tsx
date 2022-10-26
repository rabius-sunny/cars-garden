import { Container, TextInput, Space, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import useGet from 'hooks/useGet'
import useToken from 'hooks/useToken'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import requests from 'services/http'

export default function MyReview() {
  const navigate = useNavigate()
  const config = useToken()
  const [name, setName] = useState('')
  const { data } = useGet('/get-name', '', config)

  useEffect(() => {
    data && setName(data?.name)
  }, [data])
  const reviewForm = useForm({
    initialValues: {
      designation: '',
      comment: ''
    },
    validate: {
      designation: value =>
        value.length > 2 ? null : 'please enter your designation',
      comment: value =>
        value.length > 3 ? null : 'please enter your valuable comment'
    }
  })
  const handleSubmit = (formData: any) => {
    requests
      .post('/review', { ...formData, name }, config)
      .then(res => {
        if (res.message === 'ok') {
          alert('Successfully made review')
          navigate('/')
        }
      })
      .catch(err => alert('Error, try again!'))
  }
  return (
    <Container size={640} className='w-full'>
      <h1 className='text-2xl text-center sm:text-5xl font-bold text-primary my-8'>
        Make a Review
      </h1>
      <hr className='mb-8' />
      <form onSubmit={reviewForm.onSubmit(values => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label='Your Name'
          placeholder='your name'
          disabled
          defaultValue={data && data.name}
        />
        <Space h='lg' />
        <TextInput
          withAsterisk
          label='Designation'
          placeholder='CEO @ Tesla'
          {...reviewForm.getInputProps('designation')}
        />
        <Space h='lg' />
        <Textarea
          placeholder='Your comment'
          label='Your comment'
          withAsterisk
          {...reviewForm.getInputProps('comment')}
        />
        <Space h='lg' />
        <div>
          <button className='bg-primary rounded-md py-3 px-6 text-white font-semibold'>
            Make Review
          </button>
        </div>
      </form>
    </Container>
  )
}
