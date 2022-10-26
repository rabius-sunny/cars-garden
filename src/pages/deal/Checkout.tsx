import { useState } from 'react'
import DealHeader from 'components/details/Header'
import {
  Accordion,
  Button,
  Checkbox,
  Container,
  Input,
  Progress,
  Skeleton,
  TextInput
} from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconCircleCheck
} from '@tabler/icons'
import Cart from 'components/details/Cart'
import useGet from 'hooks/useGet'
import { useAppDispatch, useAppSelector } from 'hooks/useReduxHooks'
import CarDetails from 'components/details/CarDetails'
import ImportantInfo from 'components/modals/ImportantInfo'
import requests from 'services/http'
import useToken from 'hooks/useToken'
import { useForm } from '@mantine/form'
import InputMask from 'react-input-mask'
import { addCover, removeCover } from 'redux/slices/rentSlice'

export default function Checkout() {
  const navigate = useNavigate()
  const { checkoutid } = useParams()
  const { data, loading } = useGet(`/car/${checkoutid}`, checkoutid)
  const { location, fromdate, todate, picuptime, dropofftime, cover, days } =
    useAppSelector(state => state.rent)
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState({
    card: false,
    date: false
  })
  const config = useToken()

  const infoForm = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      flightNumber: '',
      cardHolderName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: ''
    },
    validate: {
      flightNumber: value =>
        value.length > 5 ? null : 'requires valid flight number',
      cardHolderName: value =>
        value.length > 4 ? null : 'requires valid name',
      cvc: value => (value.length > 3 ? null : 'requires valid cvc number'),
      email: value => (value.length > 6 ? null : 'requires valid email'),
      firstName: value => (value.length > 2 ? null : 'requires valid name'),
      lastName: value => (value.length > 2 ? null : 'requires valid name'),
      phone: value => (value.length > 3 ? null : 'requires valid phone number'),
      address: value => (value.length > 6 ? null : 'enter full address')
    }
  })

  const handleCheckout = (values: any) => {
    if (values.cardNumber.length < 16) {
      setErrors({ ...errors, card: true })
      return
    }
    if (values.expiryDate.length < 3) {
      setErrors({ ...errors, date: true })
      return
    }

    const data = {
      ...values,
      location,
      fromdate,
      todate,
      picuptime,
      dropofftime,
      days,
      cover,
      car: checkoutid
    }

    requests
      .post('/booking', data, config)
      .then(res => {
        if (res.message === 'ok') {
          alert('Successfully booked')
          navigate('/')
        }
      })
      .catch(err => alert('Error, please try again'))
  }

  return (
    <Container size='lg'>
      <header>
        <DealHeader />
      </header>
      <form onSubmit={infoForm.onSubmit(values => handleCheckout(values))}>
        <div>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 cursor-pointer mt-6 bg-transparent text-primary'
          >
            <IconArrowLeft size={25} />
            <span>Back to Deal Details</span>
          </button>
          <h1 className='stroke'>Checkout</h1>
          <p className='flex items-center gap-2'>
            Next <IconArrowRight size={18} stroke={0.9} /> Confirm
          </p>
        </div>
        <Progress mt={10} mb={10} value={100} />
        <div className='grid grid-cols-3 mt-6 gap-6'>
          <div className='col-span-3 md:col-span-2'>
            {/* Introductory */}
            <div className='bg-green-100 rounded-lg p-3 border-[1px] border-green-700 text-green-800 sm:p-4 flex items-center gap-3 sm:gap-4'>
              <IconCircleCheck stroke={0.9} />
              <div>
                <p className='font-bold text-lg text-black'>
                  What if my plans change?
                </p>
                <p>
                  You'll get a full refund if you cancel at least 48 hours
                  before pick-up.
                </p>
              </div>
            </div>
            {loading && <Skeleton mt={20} height={250} />}
            {!loading && data && <CarDetails data={data} location={location} />}
            <hr className='mb-3' />
            <div className='flex items-center justify-between'>
              <div>{data?.supplier?.name}</div>
              <ImportantInfo />
            </div>
            <hr className='my-3' />

            {/* Forms - Personal Info */}
            <div className='border-gray-300 p-3 lg:p-4 border-[1px] rounded-lg'>
              <div className='grid grid-cols-2'>
                <div className='col-span-2 lg:col-span-1'>
                  <h2 className='font-extrabold text-xl sm:text-2xl mt-4'>
                    Main driver's details
                  </h2>
                  <p>As they appear on driving licence</p>
                  <TextInput
                    mt={10}
                    withAsterisk
                    label='Email'
                    type='email'
                    {...infoForm.getInputProps('email')}
                  />
                  <TextInput
                    mt={10}
                    withAsterisk
                    label='First Name'
                    {...infoForm.getInputProps('firstName')}
                  />
                  <TextInput
                    mt={10}
                    withAsterisk
                    label='Last Name'
                    {...infoForm.getInputProps('lastName')}
                  />
                  <TextInput
                    mt={10}
                    withAsterisk
                    label='Contact Number'
                    {...infoForm.getInputProps('phone')}
                  />
                  <TextInput
                    mt={10}
                    withAsterisk
                    label='Address'
                    {...infoForm.getInputProps('address')}
                  />
                  <TextInput
                    mt={10}
                    withAsterisk
                    label='Flight Number'
                    description='Just in case the flight is delayed'
                    {...infoForm.getInputProps('flightNumber')}
                  />
                </div>
              </div>
              <p className='mt-6'>
                Our <span className='text-primary'>Privacy Notice</span>{' '}
                explains how we use and protect your personal information.
              </p>
            </div>

            {/* Cover Info */}
            <div
              className={`${
                cover
                  ? 'border-primary border-t-4 border-x-[1px] border-b-[1px]'
                  : 'border-red-500 border-t-4 border-x-[1px] border-b-[1px]'
              } p-3 lg:p-4 border-[1px] rounded-lg mt-4`}
            >
              <div className='flex justify-between'>
                <h2 className='font-bold text-lg'>
                  {cover
                    ? "You're protected"
                    : "Are you sure you don't want Extra Cover insurance?"}
                </h2>
                <h2 className='font-bold text-lg'>
                  {cover ? 'included' : '$31.66'}
                </h2>
              </div>
              <p>
                {cover
                  ? "You'll get a full refund if you're charged for anything that Extra Cover insurance covers"
                  : "Your car's zero-excess policy doesn't cover every kind of damage — or the other costs you might incur if something goes wrong. Why not add Extra Cover?"}
              </p>
              <div className='my-4'>
                <Accordion variant='separated'>
                  <Accordion.Item value='find-out-more'>
                    <Accordion.Control>Find out more</Accordion.Control>
                    <Accordion.Panel>
                      <div className='flex gap-2'>
                        <IconCheck />
                        <span>
                          Refunds charges for damage to tyres, glass,
                          undercarriage and more
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <IconCheck />
                        <span>
                          Refunds breakdown, towing, key loss and admin fees
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <IconCheck />
                        <span>
                          Refunds cost of emergency transport / accommodation
                          after an incident
                        </span>
                      </div>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className='mb-4 flex items-center justify-between'>
                <div className='text-sm'>
                  <p>Exclusions apply.</p>
                  <p className='text-primary'>Policy Terms</p>
                </div>
                <div>
                  {cover ? (
                    <Button
                      onClick={() => dispatch(removeCover())}
                      variant='outline'
                      color='red'
                    >
                      Remove Extra Cover
                    </Button>
                  ) : (
                    <Button
                      onClick={() => dispatch(addCover())}
                      variant='outline'
                    >
                      Add Extra Cover
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Forms - Payment Info */}
            <div className='border-gray-300 p-3 lg:p-4 border-[1px] rounded-lg mt-4'>
              <div className='grid grid-cols-2'>
                <div className='col-span-2 lg:col-span-1'>
                  <h2 className='font-extrabold text-lg mt-4'>
                    How would you like to pay?
                  </h2>
                  <div className='flex items-center gap-2 mt-3'>
                    <img
                      src='/assets/images/mastercard.svg'
                      alt='master card'
                    />
                    <img src='/assets/images/visa.svg' alt='visa' />
                  </div>
                  <div className='mt-4'>
                    <TextInput
                      mt={10}
                      withAsterisk
                      label="Cardholder's name"
                      {...infoForm.getInputProps('cardHolderName')}
                    />
                    <Input.Wrapper
                      error={errors.card ? 'requires valid card number' : null}
                      mt={10}
                      withAsterisk
                      label='Card Number'
                      onBlur={() => setErrors({ ...errors, card: false })}
                    >
                      <Input
                        component={InputMask}
                        mask='9999 - 9999 - 9999 - 9999'
                        {...infoForm.getInputProps('cardNumber')}
                      />
                    </Input.Wrapper>
                    <div className='flex gap-2 justify-between'>
                      <Input.Wrapper
                        onBlur={() => setErrors({ ...errors, date: false })}
                        error={errors.date ? 'requires valid date' : null}
                        className='w-full'
                        mt={10}
                        withAsterisk
                        label='Expiry date'
                      >
                        <Input
                          component={InputMask}
                          mask='99/99'
                          placeholder='MM/YY'
                          {...infoForm.getInputProps('expiryDate')}
                        />
                      </Input.Wrapper>
                      <TextInput
                        mt={10}
                        className='w-full'
                        withAsterisk
                        label='CVC'
                        {...infoForm.getInputProps('cvc')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Section */}
            <div className='mt-4 bg-lite rounded-lg p-3 border-[1px] border-primary text-primary sm:p-4 flex items-center gap-3 sm:gap-4'>
              <IconCircleCheck stroke={0.9} />
              <span>Free cancellation up to 48 hours before pick-up</span>
            </div>
            <div className='border-gray-300 p-3 lg:p-4 border-[1px] rounded-lg mt-4'>
              <h2 className='font-extrabold text-lg'>
                Ready for some money-saving ideas?
              </h2>
              <p>
                We can send you discounts and other car rental offers, saving
                you even more money in the future.
              </p>
              <div className='my-1 flex items-center gap-2'>
                <Checkbox />
                <span>No thanks, count me out.</span>
              </div>
              <p>
                Our <span className='text-primary'>Privacy Notice</span> tells
                you how to <span className='text-primary'>unsubscribe</span>. It
                also explains how we use and protect your personal information.
              </p>
            </div>
            <div className='border-gray-300 p-3 lg:p-4 border-[1px] rounded-lg mt-4'>
              <h2 className='font-extrabold text-lg'>Terms & Conditions</h2>
              <p>
                By clicking ‘Book Now’, you are confirming that you have read,
                understood and accepted our{' '}
                <span className='text-primary'>General terms</span>,{' '}
                <span className='text-primary'>Policy Terms</span> and the{' '}
                <span className='text-primary'>
                  {data?.supplier?.name} rental terms
                </span>
                .
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className='col-span-3 md:col-span-1'>
            <Cart data={data} checkout />
          </div>
        </div>

        {/* Submit Button Section */}
        <div className='md:grid md:grid-cols-3'>
          <div className='md:col-span-2'>
            <div className='mt-4 text-end'>
              <button
                type='submit'
                className='font-extrabold bg-primary w-full md:w-auto mt-2 mb-1 hover:opacity-80 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-md'
              >
                Book now
              </button>
            </div>
          </div>
        </div>
      </form>
    </Container>
  )
}
