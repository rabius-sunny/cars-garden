import { useState } from 'react'
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown
} from '@tabler/icons'
import { useNavigate } from 'react-router-dom'

const user = {
  name: 'Jane Spoonfighter',
  email: 'janspoon@fighter.dev',
  image:
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'
}
const tabs = [
  { name: 'Home', link: '/' },
  { name: 'Cars', link: '/cars' },
  { name: 'My Rents', link: '/dashboard' },
  { name: 'Suppliers', link: '/' },
  { name: 'Blogs', link: '/blog' },
  { name: 'Login', link: '/login/user' },
  { name: 'Helpdesk', link: '/' },
  { name: 'About', link: '/' }
]

const useStyles = createStyles(theme => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`
  },

  mainSection: {
    paddingBottom: theme.spacing.sm
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },
  username: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
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
    fontWeight: 500,
    height: 38,
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[1]
    },

    '&[data-active]': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[2]
    }
  }
}))

export default function Navbar() {
  const navigate = useNavigate()
  const { classes, theme, cx } = useStyles()
  const [opened, { toggle }] = useDisclosure(false)
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  const items = tabs.map(tab => (
    <Tabs.Tab
      onClick={() => navigate(tab.link)}
      value={tab.name}
      key={tab.name}
    >
      {tab.name}
    </Tabs.Tab>
  ))

  return (
    <div className={classes.header}>
      <Container size='xl' className={classes.mainSection}>
        <Group position='apart'>
          <img
            src='/assets/images/logo.png'
            width='200px'
            height='80px'
            alt='site logo'
          />

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size='sm'
          />

          <Menu
            width={260}
            position='bottom-end'
            transition='pop-top-right'
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened
                })}
              >
                <Group spacing={7}>
                  <Avatar
                    src={user.image}
                    alt={user.name}
                    radius='xl'
                    size={20}
                  />
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
              <Menu.Item
                icon={
                  <IconHeart
                    size={14}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                icon={
                  <IconStar
                    size={14}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                icon={
                  <IconMessage
                    size={14}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
                Account settings
              </Menu.Item>
              <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
                Change account
              </Menu.Item>
              <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>
                Logout
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
                Pause subscription
              </Menu.Item>
              <Menu.Item
                color='red'
                icon={<IconTrash size={14} stroke={1.5} />}
              >
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
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
          <Tabs.List>{items}</Tabs.List>
        </Tabs>
      </Container>
    </div>
  )
}
