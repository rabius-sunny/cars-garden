import Brands from 'components/home/Brands'
import Cta from 'components/home/Cta'
import Hero from 'components/home/Hero'
import { useAppDispatch } from 'hooks/useReduxHooks'
import { useEffect } from 'react'
import { atHome, notHome } from 'redux/slices/utilSlice'

export default function Home() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(atHome())

    return () => {
      dispatch(notHome())
    }
  }, [])

  return (
    <div>
      <Hero />
      <Brands />
      <Cta />
    </div>
  )
}
