import Brands from 'components/home/Brands'
import Cta from 'components/home/Cta'
import Features from 'components/home/Features'
import Hero from 'components/home/Hero'
import HomeBlog from 'components/home/HomeBlog'
import InfoAccordion from 'components/home/InfoAccordion'
import Locations from 'components/home/Locations'
import Qa from 'components/home/Qa'
import Reviews from 'components/home/Reviews'
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
      <Features />
      <Cta />
      <Locations />
      <Qa />
      <Reviews />
      <HomeBlog />
      <InfoAccordion />
    </div>
  )
}
