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
import ScrollToTop from './components/ScrollToTop.jsx'
import ThemeApplier from './components/ThemeApplier.jsx'

const Login = lazy(() => import('./pages/Login/Login.jsx'))
const Register = lazy(() => import('./pages/Register/Register.jsx'))
const Categories = lazy(() => import('./pages/Categories/Categories.jsx'))
const Transactions = lazy(() => import('./pages/Transactions/Transactions.jsx'))
const DataHandling = lazy(() => import('./pages/Legal/DataHandling.jsx'))
const Privacy = lazy(() => import('./pages/Legal/Privacy.jsx'))
const Terms = lazy(() => import('./pages/Legal/Terms.jsx'))
const Cookies = lazy(() => import('./pages/Legal/Cookies.jsx'))
const Legal = lazy(() => import('./pages/Legal/Legal.jsx'))
const About = lazy(() => import('./pages/About/About.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div className="loadingContainer loadingContainer--fullscreen"><Loading size="lg" /></div>} persistor={persistor}>
        <BrowserRouter>
          <ThemeApplier />
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<App />}/>
            <Route path='/login' element={<Suspense fallback={<div className="loadingContainer loadingContainer--fullscreen"><Loading size="lg" /></div>}><Login/></Suspense>} />
            <Route path='/register' element={<Suspense fallback={<div className="loadingContainer loadingContainer--fullscreen"><Loading size="lg" /></div>}><Register/></Suspense>}/>
            <Route path='/categories' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><Categories/></Suspense>}/>
            <Route path='/transactions' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><Transactions/></Suspense>}/>
            <Route path='/legal/datos' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><DataHandling/></Suspense>}/>
            <Route path='/legal/privacidad' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><Privacy/></Suspense>}/>
            <Route path='/legal/terminos' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><Terms/></Suspense>}/>
            <Route path='/legal/cookies' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><Cookies/></Suspense>}/>
            {/* aliases cortos */}
            <Route path='/privacidad' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><Privacy/></Suspense>}/>
            <Route path='/legal' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><Legal/></Suspense>}/>
            <Route path='/privacy' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><Legal/></Suspense>}/>
            <Route path='/about' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><About/></Suspense>}/>
            <Route path='/sobre' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><About/></Suspense>}/>
            <Route path='/acerca' element={<Suspense fallback={<div className="loadingContainer loadingContainer--page"><Loading size="lg" /></div>}><About/></Suspense>}/>
          </Routes>
        </BrowserRouter>
        <Toaster theme='light' position='bottom-center'/>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
