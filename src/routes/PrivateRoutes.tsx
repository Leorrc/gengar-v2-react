import { parseCookies } from "nookies"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
  const { token } = parseCookies()

  return (
    token ? <Outlet /> : <Navigate to="/" />
  )
}

export default PrivateRoutes