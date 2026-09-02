import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer'
import Hero from './components/layout/Hero/Hero'
import InfoCards from './features/analytics/components/InfoCards/InfoCards'
import ActionSection from './features/transactions/components/ActionSection/ActionSection'
import AnalitycSection from './features/analytics/components/AnalitycSection/AnalitycSection'
import Budget from './features/budget/components/Budget/Budget'
import { useTheme } from './features/theme/hooks/useTheme'
import { useDashboardData } from './hooks'
import { useBackendWakeUp } from './hooks/useBackendWakeUp'
import WakeUpModal from './components/ui/WakeUpModal/WakeUpModal'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsAuthenticated, selectAuthRefreshToken, refreshTokenAction } from './features/loginRegister/redux/validationReducer'
import { Suspense, lazy, useEffect } from 'react'
import Loading from './components/ui/Loading/Loading'

const Landing = lazy(() => import('./pages/Landing/Landing'))

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuthenticated)
  const refreshToken = useSelector(selectAuthRefreshToken)

  // Only check backend health when user is authenticated (dashboard needs it).
  // Landing is public and must render without depending on the server.
  const { status, attempts, maxAttempts, retry } = useBackendWakeUp({ enabled: isAuth })
  const isBackendAwake = !isAuth ? true : status === 'awake'

  useTheme()
  // Only fetch dashboard data once backend is confirmed awake and user is authed
  useDashboardData(isBackendAwake && isAuth)

  useEffect(() => {
    if (!isBackendAwake) return
    if (!isAuth && refreshToken) {
      dispatch(refreshTokenAction())
    }
  }, [isAuth, refreshToken, dispatch, isBackendAwake])

  if (!isAuth) {
    return (
      <Suspense fallback={<div className="loadingContainer loadingContainer--fullscreen"><Loading size="lg" /></div>}>
        <Landing />
      </Suspense>
    )
  }

  if (!isBackendAwake) {
    return <WakeUpModal status={status} attempts={attempts} maxAttempts={maxAttempts} onRetry={retry} />
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flex: 1, width: '100%' }}>
      <Header />
      <div className='dashboardContainer' style={{ flex: 1, width: '100%' }}>
        <Hero />
        <InfoCards />
        <ActionSection />
        <Budget budgetToRender={2}/>
        <AnalitycSection />
      </div>
      <Footer />
    </div>
  )
}

export default App
