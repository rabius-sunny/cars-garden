import {
  Title,
  Text,
  Container,
  Overlay,
  createStyles,
  useMantineTheme,
  Autocomplete,
  Grid,
  Select
} from '@mantine/core'
import { IconChevronDown, IconClock, IconMapPin } from '@tabler/icons'
import RCalender from 'components/modals/RCalender'
import Navsbar from 'components/shared/Navbar'
import { useAppDispatch, useAppSelector } from 'hooks/useReduxHooks'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDropoff, addLocation, addPickup } from 'redux/slices/rentSlice'
import cities from 'static/cities'
import times from 'static/times'

const useStyles = createStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingBottom: 130,
    backgroundImage: "url('/assets/images/homebg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (max-width: 520px)': {
      paddingBottom: 50
    }
  },

  inner: {
    position: 'relative',
    zIndex: 1
  },

  title: {
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    color: theme.white,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left'
    }
  },

  highlight: {
    color: theme.colors[theme.primaryColor][4]
  },

  description: {
    color: theme.colors.gray[0],
    textAlign: 'center',

    '@media (max-width: 520px)': {
      fontSize: theme.fontSizes.md,
      textAlign: 'left'
    }
  },

  controls: {
    marginTop: theme.spacing.xl * 1.5,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,

    '@media (max-width: 520px)': {
      flexDirection: 'column'
    }
  },

  control: {
    height: 42,
    fontSize: theme.fontSizes.md,

    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md
    },

    '@media (max-width: 520px)': {
      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0
      }
    }
  },

  secondaryControl: {
    color: theme.white,
    backgroundColor: 'rgba(255, 255, 255, .4)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, .45) !important'
    }
  }
}))

export default function Hero() {
  const { classes } = useStyles()
  const theme = useMantineTheme()
  const [_location, set_location] = useState<string>('')
  const [errors, setErrors] = useState({
    location: false,
    days: false,
    picuptime: false,
    dropofftime: false
  })
  const dispatch = useAppDispatch()
  const { location, days, fromdate, todate, picuptime, dropofftime } =
    useAppSelector(state => state.rent)
  const navigate = useNavigate()

  const handleSubmit = () => {
    setErrors({
      location: location ? false : true,
      days: fromdate && todate ? false : true,
      picuptime: picuptime ? false : true,
      dropofftime: dropofftime ? false : true
    })
    if (
      !location ||
      !days ||
      !fromdate ||
      !todate ||
      !picuptime ||
      !dropofftime
    ) {
      return
    }
    navigate(`/search/location/${location}/duration/${days}`)
  }

  return (
    <div className={classes.wrapper}>
      <Overlay color='#000' opacity={0.5} zIndex={1} />

      <div className={classes.inner}>
        <Navsbar atHome={true} />
        <Container size={580}>
          <Title className={classes.title}>
            Get your prefered car for your{' '}
            <Text component='span' inherit className={classes.highlight}>
              dream road
            </Text>{' '}
            jouney
          </Title>

          <Text size='lg' className={classes.description}>
            At{' '}
            <Text component='span' inherit className={classes.highlight}>
              Car Garden
            </Text>{' '}
            we have all the varities of latest cars of your prefer. Get a car
            and have a greate travel that you dreamed of. So what are you
            waiting for, search available cars with your preferences.
          </Text>
        </Container>
        <Container size='lg'>
          <Grid
            grow
            align='center'
            className='mt-4 p-2 rounded-md'
            style={{ backgroundColor: theme.colors.blue[6] }}
          >
            <Grid.Col span={12} sm={6}>
              <div>
                <Autocomplete
                  icon={<IconMapPin />}
                  transition='fade'
                  transitionDuration={150}
                  maxDropdownHeight={200}
                  data={cities}
                  onBlur={e => dispatch(addLocation(e.target.value))}
                  size='lg'
                  defaultValue={location || ''}
                  error={errors.location}
                  styles={theme => ({
                    input: {
                      fontWeight: 'bold',
                      fontSize: '1.1rem'
                    },
                    item: {
                      fontWeight: 'bold',
                      color: 'black'
                    }
                  })}
                  placeholder='pick-up location'
                  nothingFound='Nothing found'
                />
              </div>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>
              <RCalender error={errors.days} />
            </Grid.Col>
            <Grid.Col span={6} sm={4}>
              <Select
                data={times}
                allowDeselect
                placeholder='pick-up time'
                maxDropdownHeight={250}
                size='lg'
                defaultValue={picuptime}
                onChange={time => dispatch(addPickup(time))}
                error={errors.picuptime}
                styles={theme => ({
                  item: {
                    fontWeight: 600
                  }
                })}
                rightSection={
                  <IconChevronDown stroke={0.7} className='text-primary' />
                }
                icon={<IconClock />}
              />
            </Grid.Col>
            <Grid.Col span={6} sm={4}>
              <Select
                data={times}
                error={errors.dropofftime}
                allowDeselect
                placeholder='drop-off time'
                maxDropdownHeight={250}
                size='lg'
                defaultValue={dropofftime}
                onChange={time => dispatch(addDropoff(time))}
                styles={theme => ({
                  item: {
                    fontWeight: 600
                  }
                })}
                rightSection={
                  <IconChevronDown stroke={0.7} className='text-primary' />
                }
                icon={<IconClock />}
              />
            </Grid.Col>
            <Grid.Col span={12} sm={4}>
              <button
                onClick={handleSubmit}
                onBlur={() =>
                  setErrors({
                    location: false,
                    days: false,
                    picuptime: false,
                    dropofftime: false
                  })
                }
                className='w-full text-white bg-[#008040] p-[9px] text-2xl text-center rounded shadow font-semibold'
              >
                Search
              </button>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </div>
  )
}
