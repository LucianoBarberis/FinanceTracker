import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { Toaster } from '@pheralb/toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}/>
        </Routes>
      </BrowserRouter>
      <Toaster theme='light' position='bottom-center'/>
    </Provider>
  </StrictMode>,
)
