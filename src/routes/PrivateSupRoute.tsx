import { useAppSelector } from 'hooks/redux'
import { Navigate } from 'react-router-dom'

export default function PrivateSupRoute({ children }: any) {
  const token = useAppSelector(state => state.user.supplierToken)

  return token ? children : <Navigate to='/login/supplier' />
}
