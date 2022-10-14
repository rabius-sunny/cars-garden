import { useState } from 'react'
import { createStyles, Navbar, Group, Container } from '@mantine/core'
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconLogout
} from '@tabler/icons'
import { useNavigate } from 'react-router-dom'
import CreateService from 'pages/supplier/CreateService'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
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
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      width: '100%',

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor
          }).color
        }
      }
    }
  }
})

const data = [
  { link: '/login/user', label: 'Notifications', icon: IconBellRinging },
  { link: '/dashboard', label: 'Billing', icon: IconReceipt2 },
  { link: '/dashboard', label: 'Security', icon: IconFingerprint },
  { link: '/dashboard', label: 'SSH Keys', icon: IconKey },
  { link: '/dashboard', label: 'Databases', icon: IconDatabaseImport },
  { link: '/dashboard', label: 'Authentication', icon: Icon2fa },
  { link: '/dashboard', label: 'Other Settings', icon: IconSettings }
]

export default function SupplierDashboard() {
  const navigate = useNavigate()
  const { classes, cx } = useStyles()
  const [active, setActive] = useState('Billing')

  const links = data.map(item => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active
      })}
      key={item.label}
      onClick={event => {
        event.preventDefault()
        navigate(item.link)
        setActive(item.label)
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ))

  return (
    <div className='flex'>
      <div>
        <Navbar height={700} width={{ sm: 200 }}>
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
            <a className={classes.link} onClick={() => alert('logout')}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
      </div>
      <CreateService />
    </div>
  )
}
