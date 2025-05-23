import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store} >
        <BrowserRouter>
          <App />
          <script src="https://accounts.google.com/gsi/client" async defer></script>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  </StrictMode>
)
