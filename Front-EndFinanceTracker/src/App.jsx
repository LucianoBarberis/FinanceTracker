import Header from './components/layout/Header/Header'
import Hero from './components/layout/Hero/Hero'
import InfoCards from './features/analytics/components/InfoCards/InfoCards'
import ActionSection from './features/transactions/components/ActionSection/ActionSection'
import AnalitycSection from './features/analytics/components/AnalitycSection/AnalitycSection'
import Budget from './features/budget/components/Budget/Budget'
import { useTheme } from './features/theme/hooks/useTheme'
import { useDashboardData } from './hooks'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsAuthenticated, selectAuthRefreshToken, refreshTokenAction } from './features/loginRegister/redux/validationReducer'
import { Suspense, lazy, useEffect } from 'react'
import Loading from './components/ui/Loading/Loading'

const Login = lazy(() => import('./pages/Login/Login'))

function App() {
  useTheme();
  useDashboardData();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuthenticated);
  const refreshToken = useSelector(selectAuthRefreshToken);

  useEffect(() => {
    if (!isAuth && refreshToken) {
      dispatch(refreshTokenAction());
    }
  }, [isAuth, refreshToken, dispatch]);

  if(!isAuth){
    return (
      <Suspense fallback={<div className="loadingContainer"><Loading /></div>}>
        <Login />
      </Suspense>
    )
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
