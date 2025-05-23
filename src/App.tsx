import './App.css'
import { Toaster } from './components/ui/sonner'
import { APP_NAME } from './config/app/constants'
import AppRoutes from './routes/appRoutes'

function App() {

  return (
    <>
    <head>
      <title>{APP_NAME}</title>
    </head>
    <AppRoutes />
    <Toaster />
    </>
  )
}

export default App
