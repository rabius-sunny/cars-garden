import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import './index.css'
import CLoader from 'components/shared/CLoader'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<CLoader />}>
        <App />
      </Suspense>
    </Provider>
  </React.StrictMode>
)
