import { useEffect, useState } from 'react'
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Drawer,
  Navbar
} from '@mantine/core'
import {
  IconChevronDown,
  IconAlignLeft,
  IconEdit,
  IconLogout
} from '@tabler/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/useReduxHooks'
import { logout } from 'redux/slices/userSlice'

export default function Navsbar({ atHome }: any) {
  const useStyles = createStyles(theme => ({
    header: {
      paddingTop: theme.spacing.sm,
      backgroundColor: atHome ? '#7470ff38' : theme.colors.gray[0],
      borderBottom: atHome ? 'none' : `1px solid ${theme.colors.gray[2]}`
    },

    mainSection: {
      paddingBottom: theme.spacing.sm
    },
    link: {
      ...theme.fn.focusStyles(),
      cursor: 'pointer',
      display: 'block',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[8],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      fontWeight: 'bold',
      width: '100%',

      '&:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor
        }).background,

        color: theme.primaryColor
      }
    },
    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'filled',
          color: theme.primaryColor
        }).background,
        color: 'white'
      }
    },
    user: {
      display: 'flex',
      alignItems: 'center',
      color: atHome ? theme.white : theme.black,
      transition: 'background-color 100ms ease'
    },
    username: {
      [theme.fn.smallerThan('xs')]: {
        display: 'none'
      }
    },

    burger: {
      background: 'transparent',
      [theme.fn.largerThan('sm')]: {
        display: 'none'
      }
    },

    userActive: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
    },

    tabs: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none'
      }
    },

    tabsList: {
      borderBottom: '0 !important'
    },

    tab: {
      fontWeight: 'bold',
      fontSize: '1.1rem',
      height: 38,
      color: atHome ? 'white' : theme.colors.gray[7],
      backgroundColor: 'transparent',

      '&:hover': {
        backgroundColor: atHome ? '#ffffff42' : theme.white
      },

      '&[data-active]': {
        backgroundColor: atHome ? 'transparent' : theme.white,
        borderColor: theme.colors.gray[2]
      }
    }
  }))
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { classes, cx } = useStyles()
  const [userMenuOpened, setUserMenuOpened] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [tabs, setTabs] = useState<any[]>(generalTabs)
  const user = useAppSelector(state => state.user)

  useEffect(() => {
    user.userToken && setTabs(userTabs)
    user.supplierToken && setTabs(supplierTabs)
  }, [user.userToken, user.supplierToken])

  const links = tabs.map(item => (
    <a
      className={classes.link}
      key={item.name}
      onClick={event => {
        event.preventDefault()
        navigate(item.link)
        setOpen(false)
      }}
    >
      <span>{item.name}</span>
    </a>
  ))

  const handleClick = (link: string) => {
    setUserMenuOpened(false)
    navigate(link)
  }

  return (
    <div className={classes.header}>
      <Container size='xl' className={classes.mainSection}>
        <Group position='apart'>
          <button className={classes.burger} onClick={() => setOpen(true)}>
            <IconAlignLeft
              size={30}
              stroke={1.5}
              className='text-primary bg-transparent'
            />
          </button>
          <Link to='/'>
            <img
              src='/assets/images/logo.png'
              width='150px'
              height='70px'
              alt='site logo'
            />
          </Link>

          {user.userToken || user.supplierToken ? (
            <Menu width={260} position='bottom-end' transition='pop-top-right'>
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened
                  })}
                >
                  <Group spacing={7}>
                    <Avatar color='blue' radius='xl' size={35}>
                      {user.name[0]}
                    </Avatar>
                    <Text
                      className={classes.username}
                      weight={500}
                      size='sm'
                      sx={{ lineHeight: 1 }}
                      mr={3}
                    >
                      {user.name}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Setting</Menu.Label>
                <Menu.Item
                  onClick={() => handleClick('/edit/profile')}
                  icon={<IconEdit size={20} stroke={1.5} color='teal' />}
                >
                  Edit profile info.
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  onClick={() => {
                    if (window.confirm('Are you sure to logout?'))
                      dispatch(logout())
                  }}
                  icon={<IconLogout size={20} stroke={1.5} color='red' />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Link
              className='bg-primary hover:bg-lite hover:text-primary hover:ring-2 hover:ring-primary text-white font-semibold py-1 px-2 md:py-2 md:px-4 '
              to='/login/user'
            >
              Login
            </Link>
          )}
        </Group>
        <Drawer
          opened={open}
          onClose={() => setOpen(false)}
          title={
            <div>
              <img
                src='/assets/images/logo.png'
                width='150px'
                height='60px'
                alt='site logo'
              />
            </div>
          }
          padding='md'
          position='left'
          size='50%'
        >
          <Navbar>
            <Navbar.Section grow>
              {links}
              {(user.supplierToken || user.userToken) && (
                <a
                  className={classes.link}
                  onClick={event => {
                    event.preventDefault()
                    if (window.confirm('Are you sure to logout?'))
                      dispatch(logout())
                  }}
                >
                  <span>Logout</span>
                </a>
              )}
            </Navbar.Section>
          </Navbar>
        </Drawer>
      </Container>
      <Container>
        <Tabs
          defaultValue='Home'
          variant='outline'
          classNames={{
            root: classes.tabs,
            tabsList: classes.tabsList,
            tab: classes.tab
          }}
        >
          <Tabs.List>
            {/* <Tabs.Tab onClick={() => navigate('/')} value='Home'>
              Home
            </Tabs.Tab> */}
            <Tabs.Tab onClick={() => navigate('/cars')} value='Cars'>
              Cars
            </Tabs.Tab>
            {user.userToken && (
              <Tabs.Tab
                onClick={() => navigate('/dashboard/user')}
                value='My Rents'
              >
                My Rents
              </Tabs.Tab>
            )}
            {user.supplierToken && (
              <Tabs.Tab
                onClick={() => navigate('/dashboard/supplier')}
                value='Dashboard'
              >
                Dashboard
              </Tabs.Tab>
            )}
            <Tabs.Tab onClick={() => navigate('/suppliers')} value='Suppliers'>
              Suppliers
            </Tabs.Tab>
            <Tabs.Tab onClick={() => navigate('/blogs')} value='Blogs'>
              Blogs
            </Tabs.Tab>
            {!user.userToken && !user.supplierToken && (
              <Tabs.Tab onClick={() => navigate('/login/user')} value='Login'>
                Login
              </Tabs.Tab>
            )}
            <Tabs.Tab onClick={() => navigate('/about')} value='About'>
              About
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Container>
    </div>
  )
}

const generalTabs = [
  { name: 'Home', link: '/' },
  { name: 'Cars', link: '/cars' },
  { name: 'Suppliers', link: '/suppliers' },
  { name: 'Blogs', link: '/blog' },
  { name: 'Helpdesk', link: '/helpdesk' },
  { name: 'About', link: '/about' },
  { name: 'Login', link: '/login/user' }
]
const userTabs = [
  { name: 'Home', link: '/' },
  { name: 'Cars', link: '/cars' },
  { name: 'My Rents', link: '/dashboard/user' },
  { name: 'Suppliers', link: '/suppliers' },
  { name: 'Blogs', link: '/blog' },
  { name: 'Helpdesk', link: '/helpdesk' },
  { name: 'About', link: '/about' }
]
const supplierTabs = [
  { name: 'Home', link: '/' },
  { name: 'Cars', link: '/cars' },
  { name: 'Dashboard', link: '/dashboard/supplier' },
  { name: 'Suppliers', link: '/suppliers' },
  { name: 'Blogs', link: '/blog' },
  { name: 'Helpdesk', link: '/helpdesk' },
  { name: 'About', link: '/about' }
]
