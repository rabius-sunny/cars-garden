import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

import Routings from 'routes/Routings'

export default function App() {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <NotificationsProvider>
        <Routings />
      </NotificationsProvider>
    </MantineProvider>
  )
}
