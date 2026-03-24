import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { Toaster } from '@pheralb/toast'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Categories from './pages/Categories/Categories.jsx'
import Transactions from './pages/Transactions/Transactions.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path='/transactions' element={<Transactions/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster theme='light' position='bottom-center'/>
    </Provider>
  </StrictMode>,
)
