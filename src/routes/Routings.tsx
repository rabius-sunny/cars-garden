import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from 'components/shared/Layout'
import PrivateSupRoute from './PrivateSupRoute'
import PrivateUserRoute from './PrivateUserRoute'
import Cars from 'pages/deal/Cars'
import SearchResult from 'pages/deal/SearchResult'
import DealDetails from 'pages/deal/DealDetails'
import Checkout from 'pages/deal/Checkout'
const Home = lazy(() => import('pages/index'))
const UserLogin = lazy(() => import('pages/auth/User'))
const SupplierLogin = lazy(() => import('pages/auth/Supplier'))
const UserDashboard = lazy(() => import('pages/dashboard/User'))
const SupplierDashboard = lazy(() => import('pages/dashboard/Supplier'))

export default function Routings() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/cars' element={<Cars />} />
          <Route path='/login/user' element={<UserLogin />} />
          <Route path='/login/supplier' element={<SupplierLogin />} />
          <Route
            path='/search/location/:location/duration/:days'
            element={<SearchResult />}
          />
          <Route
            path='/dashboard/supplier'
            element={
              <PrivateSupRoute>
                <SupplierDashboard />
              </PrivateSupRoute>
            }
          />
          <Route
            path='/dashboard/user'
            element={
              <PrivateUserRoute>
                <UserDashboard />
              </PrivateUserRoute>
            }
          />
          <Route
            path='/deal/details/car/:carname/:id'
            element={
              <PrivateUserRoute>
                <DealDetails />
              </PrivateUserRoute>
            }
          />
          <Route
            path='/checkout/car/:name/:checkoutid'
            element={
              <PrivateUserRoute>
                <Checkout />
              </PrivateUserRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
