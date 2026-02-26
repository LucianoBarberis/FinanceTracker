import { useSelector, useDispatch } from 'react-redux'
import Header from './components/layout/Header/Header'
import Hero from './components/layout/Hero/Hero'
import InfoCards from './components/layout/InfoCards/InfoCards'
import ActionSection from './components/layout/ActionSection/ActionSection'
import AnalitycSection from './components/layout/AnalitycSection/AnalitycSection'

function App() {

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
