import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import { Link } from 'react-router'
import './Legal.css'

export default function Privacy() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flex: 1 }}>
      <Header />
      <main className="legal-page" style={{ flex: 1 }}>
        <div className="legal-hero">
          <h1>Privacidad</h1>
          <p>Estoy totalmente comprometido con la protección de tu privacidad y el tratamiento de tus datos personales, es por eso que me tome el tiempo de detallar cómo se tratan los datos que ingresas a mi app.</p>
          <div className="legal-meta"><span>2 sep 2026</span><span>RGPD · LOPDGDD</span></div>
        </div>
        <div className="legal-content">
          <section className="legal-card">
            <h2>En pocas palabras</h2>
            <p>No vendemos datos, no perfilamos con fines publicitarios y solo recogemos lo necesario para que FinTrack funcione. Puedes borrar todo cuando quieras.</p>
            <div className="legal-actions">
              <Link className="legal-btn legal-btn--primary" to="/legal/datos">Cómo tratamos tus datos</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
