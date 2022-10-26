import { useState } from 'react'
import { createStyles, Navbar, Group, Drawer } from '@mantine/core'
import {
  IconLogout,
  IconArrowBarRight,
  IconShoppingCart,
  IconMoodHappy
} from '@tabler/icons'
import { useAppDispatch } from 'hooks/useReduxHooks'
import { logout } from 'redux/slices/userSlice'
import MyBooking from 'pages/user/MyBooking'
import MyReview from 'pages/user/MyReview'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')
  return {
    header: {
      marginBottom: theme.spacing.md * 1.5
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `2px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`
    },

    link: {
      ...theme.fn.focusStyles(),
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[8],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      fontWeight: 500,
      width: '100%',

      '&:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor
        }).background,

        color: theme.primaryColor,

        [`& .${icon}`]: {
          color: theme.primaryColor
        }
      }
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[8],
      marginRight: theme.spacing.sm
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'filled',
          color: theme.primaryColor
        }).background,
        color: 'white',
        [`& .${icon}`]: {
          color: 'white'
        }
      }
    }
  }
})

const data = [
  { item: 'bookings', label: 'My Booking', icon: IconShoppingCart },
  { item: 'reviews', label: 'My Review', icon: IconMoodHappy }
]

export default function UserDashboard() {
  const dispatch = useAppDispatch()
  const { classes, cx } = useStyles()
  const [active, setActive] = useState<string>('bookings')
  const [open, setOpen] = useState<boolean>(false)

  const links = data.map(item => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.item === active
      })}
      key={item.item}
      onClick={event => {
        event.preventDefault()
        setActive(item.item)
        setOpen(false)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <div className='md:flex'>
      <div className='block md:hidden my-4 pl-4'>
        <button
          onClick={() => setOpen(true)}
          className='flex items-center bg-transparent text-primary font-bold'
        >
          <span>open menu</span>
          <IconArrowBarRight
            className={classes.linkIcon}
            style={{ color: '#228be6' }}
            stroke={1.5}
          />
        </button>
      </div>
      <Drawer
        opened={open}
        onClose={() => setOpen(false)}
        title='Dashboard'
        padding='md'
        position='left'
        size='80%'
      >
        <Navbar height={300}>
          <Navbar.Section grow>
            <Group className={classes.header} position='apart'>
              <div className='bg-gray-800 p-2'>
                <img
                  src='/assets/images/logo.png'
                  width='200px'
                  height='80px'
                  alt='site logo'
                />
              </div>
            </Group>
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a
              className={classes.link}
              onClick={() => {
                if (window.confirm('Are you sure to logout?'))
                  dispatch(logout())
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
      </Drawer>

      <div className=' hidden md:block'>
        <Navbar height={'100%'} width={{ sm: 200 }}>
          <Navbar.Section grow>
            <Group className={classes.header} position='apart'>
              <div className='bg-gray-800 p-2'>
                <img
                  src='/assets/images/logo.png'
                  width='200px'
                  height='80px'
                  alt='site logo'
                />
              </div>
            </Group>
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a
              className={classes.link}
              onClick={() => {
                if (window.confirm('Are you sure to logout?'))
                  dispatch(logout())
              }}
            >
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
      </div>
      {active === 'bookings' ? <MyBooking /> : <MyReview />}
    </div>
  )
}
