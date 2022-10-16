import { useAppSelector } from 'hooks/useReduxHooks'
import { Navigate } from 'react-router-dom'

export default function PrivateUserRoute({ children }: any) {
  const token = useAppSelector(state => state.user.userToken)

  return token ? children : <Navigate to='/login/user' />
}
