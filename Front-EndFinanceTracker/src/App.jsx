import Header from './components/layout/Header/Header'
import Hero from './components/layout/Hero/Hero'
import InfoCards from './features/analytics/components/InfoCards/InfoCards'
import ActionSection from './features/transactions/components/ActionSection/ActionSection'
import AnalitycSection from './features/analytics/components/AnalitycSection/AnalitycSection'
import Budget from './features/budget/components/Budget/Budget'
import { useTheme } from './features/theme/hooks/useTheme'
import { useSelector } from 'react-redux'
import Login from "./pages/Login/Login"

function App() {
  useTheme();
  const isAuth = useSelector((state) => state.auth.isAuthenticated)
  if(!isAuth){
    return <Login />
  }
  return (
    <>
      <Header />
      <div className='dashboardContainer'>
        <Hero />
        <InfoCards />
        <ActionSection />
        <Budget budgetToRender={2}/>
        <AnalitycSection />
      </div>
    </>
  )
}

export default App
