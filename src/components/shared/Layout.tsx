import { Footer } from './Footer'
import Navbar from './Navbar'

export default function Layout({ children }: any) {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      {children}
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
