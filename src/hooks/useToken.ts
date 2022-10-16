import { useAppSelector } from './useReduxHooks'

export default function useToken() {
  const user = useAppSelector(state => state.user)
  const token = user.userToken || user.supplierToken
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return config
}
