import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { Rotas } from './routes'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Rotas />
        <ToastContainer theme="colored" />
      </AuthProvider>
    </BrowserRouter>
  )
}