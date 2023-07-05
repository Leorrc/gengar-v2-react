import { Routes, Route, Navigate } from 'react-router-dom'
import { Transactions } from '../pages/Transactions'
import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'
import PrivateRoutes from './PrivateRoutes'
import { parseCookies } from 'nookies'

export function Rotas() {
  const { token } = parseCookies()
  const isLoggedIn = token

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Transactions />} path='/transactions' />
        <Route path='*' element={<Navigate to="/transactions" replace />} />
      </Route>
      {isLoggedIn ? (
        <Route path='/' element={<Navigate to="/transactions" replace />} />
      ) : (
        <Route path='/' element={<SignIn />} />
      )}
      <Route path='/' element={<SignIn />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
  )
}

