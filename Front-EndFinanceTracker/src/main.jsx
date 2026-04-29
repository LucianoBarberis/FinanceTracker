import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from '@pheralb/toast'
import Loading from './components/ui/Loading/Loading.jsx'

const Login = lazy(() => import('./pages/Login/Login.jsx'))
const Register = lazy(() => import('./pages/Register/Register.jsx'))
const Categories = lazy(() => import('./pages/Categories/Categories.jsx'))
const Transactions = lazy(() => import('./pages/Transactions/Transactions.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div className="loadingContainer"><Loading /></div>} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />}/>
            <Route path='/login' element={<Suspense fallback={<div className="loadingContainer"><Loading /></div>}><Login/></Suspense>} />
            <Route path='/register' element={<Suspense fallback={<div className="loadingContainer"><Loading /></div>}><Register/></Suspense>}/>
            <Route path='/categories' element={<Suspense fallback={<div className="loadingContainer"><Loading /></div>}><Categories/></Suspense>}/>
            <Route path='/transactions' element={<Suspense fallback={<div className="loadingContainer"><Loading /></div>}><Transactions/></Suspense>}/>
          </Routes>
        </BrowserRouter>
        <Toaster theme='light' position='bottom-center'/>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
