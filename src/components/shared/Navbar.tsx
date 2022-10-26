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
  IconLogout,
  IconTicket
} from '@tabler/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
    navs: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none'
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
    }
  }))
  const navigate = useNavigate()
  const { pathname } = useLocation()
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
                  onClick={() => handleClick('/dashboard/user')}
                  icon={<IconTicket size={20} stroke={1.5} color='indigo' />}
                >
                  Manage Booking
                </Menu.Item>
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

      <Container className={classes.navs}>
        <div className='flex items-center relative'>
          {tabs.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`font-bold px-4 pt-[6px] pb-1 rounded-t text-lg hover:bg-gray-100 ${
                item.link.includes(pathname) &&
                !atHome &&
                'border-b-4 border-primary'
                // 'bg-white border-[1px] border-gray-200 border-b-0 relative bottom-[-1px]'
              } ${atHome && 'text-white hover:bg-[#7470ff38]'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}

const generalTabs = [
  { name: 'Cars', link: '/cars', value: 'cars' },
  { name: 'Suppliers', link: '/suppliers', value: 'suppliers' },
  { name: 'Blogs', link: '/blog', value: 'blog' },
  { name: 'Helpdesk', link: '/helpdesk', value: 'helpdesk' },
  { name: 'About', link: '/about', value: 'about' }
]
const userTabs = [
  { name: 'Cars', link: '/cars', value: 'cars' },
  { name: 'My Rents', link: '/dashboard/user', value: 'dashboard' },
  { name: 'Suppliers', link: '/suppliers', value: 'suppliers' },
  { name: 'Blogs', link: '/blog', value: 'blog' },
  { name: 'Helpdesk', link: '/helpdesk', value: 'helpdesk' },
  { name: 'About', link: '/about', value: 'about' }
]
const supplierTabs = [
  { name: 'Cars', link: '/cars', value: 'cars' },
  {
    name: 'Dashboard',
    link: '/dashboard/supplier',
    value: 'dashboard'
  },
  { name: 'Suppliers', link: '/suppliers', value: '' },
  { name: 'Blogs', link: '/blog', value: 'blog' },
  { name: 'Helpdesk', link: '/helpdesk', value: 'helpdesk' },
  { name: 'About', link: '/about', value: 'about' }
]
