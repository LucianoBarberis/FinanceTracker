import Header from './components/layout/Header/Header'
import Hero from './components/layout/Hero/Hero'
import InfoCards from './features/analytics/components/InfoCards/InfoCards'
import ActionSection from './features/transactions/components/ActionSection/ActionSection'
import AnalitycSection from './features/analytics/components/AnalitycSection/AnalitycSection'
import { useTheme } from './features/theme/hooks/useTheme'

function App() {
  useTheme();

  return (
    <>
      <Header />
      <Hero />
      <InfoCards />
      <ActionSection />
      <AnalitycSection />
    </>
  )
}

export default App
