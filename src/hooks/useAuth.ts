import { useAppSelector } from './useReduxHooks'

export default function useAuth() {
  const user = useAppSelector(state => state.user)
  const token = user.userToken || user.supplierToken
  const auth = token ? true : false
  return auth
}
