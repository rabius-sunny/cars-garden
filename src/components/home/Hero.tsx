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
import { useAppDispatch } from 'hooks/useReduxHooks'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addDropoff, addLocation, addPickup } from 'redux/slices/rentSlice'
import cities from 'static/cities'
import times from 'static/times'

const useStyles = createStyles(theme => ({
  wrapper: {
    position: 'relative',
    paddingTop: 180,
    paddingBottom: 130,
    backgroundImage: "url('/assets/images/homebg.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (max-width: 520px)': {
      paddingTop: 80,
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
  const [_location, set_location] = useState('')
  const dispatch = useAppDispatch()

  return (
    <div className={classes.wrapper}>
      <Overlay color='#000' opacity={0.5} zIndex={1} />

      <div className={classes.inner}>
        <Container size={580}>
          <Title className={classes.title}>
            Automated AI code reviews for{' '}
            <Text component='span' inherit className={classes.highlight}>
              any stack
            </Text>
          </Title>

          <Text size='lg' className={classes.description}>
            Build more reliable software with AI companion. AI is also trained
            to detect lazy developers who do nothing and just complain on
            Twitter.
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
                  value={_location}
                  onChange={set_location}
                  onBlur={() => dispatch(addLocation(_location))}
                  size='lg'
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
              <RCalender />
            </Grid.Col>
            <Grid.Col span={6} sm={4}>
              <Select
                data={times}
                allowDeselect
                placeholder='pick-up time'
                maxDropdownHeight={250}
                size='lg'
                onChange={time => dispatch(addPickup(time))}
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
                allowDeselect
                placeholder='drop-off time'
                maxDropdownHeight={250}
                size='lg'
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
              <button className='w-full text-white bg-[#008040] p-[9px] text-2xl text-center rounded shadow font-semibold'>
                Search
              </button>
            </Grid.Col>
          </Grid>
        </Container>
      </div>
    </div>
  )
}
