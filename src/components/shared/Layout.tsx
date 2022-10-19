import { useAppSelector } from 'hooks/useReduxHooks'
import { Footer } from './Footer'
import Navbar from './Navbar'

export default function Layout({ children }: any) {
  const status = useAppSelector(state => state.utils.isHome)
  return (
    <div>
      {!status && (
        <header>
          <Navbar />
        </header>
      )}
      {children}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
