import { Link } from 'react-router'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import { VscCreditCard, VscTag, VscGraph, VscArrowRight, VscGithub } from 'react-icons/vsc'
import './Landing.css'

export default function Landing() {
  return (
    <div className="landing-root">
      <Header />

      <main className="landing-main">
        {/* Hero */}
        <section className="landing-hero" aria-labelledby="landing-title">
          <h1 id="landing-title" className="landing-title">
            Tus finanzas,
            <br />
            <span className="landing-title__accent">claras y bajo control.</span>
          </h1>
          <p className="landing-subtitle">
            App para gestionar transacciones, categorías y presupuestos.
            Simple, sin letra chica.
          </p>

          <div className="landing-ctas">
            <Link to="/login" className="landing-btn landing-btn--primary" aria-label="Ingresar a tu cuenta">
              Ingresar
              <VscArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link to="/register" className="landing-btn landing-btn--ghost" aria-label="Crear una cuenta nueva">
              Crear cuenta
            </Link>
          </div>

          <p className="landing-hero__note">
            ¿Solo querés mirar? <Link to="/about">Conocé el stack</Link> o <a href="https://github.com/LucianoBarberis/FinanceTracker" target="_blank" rel="noopener noreferrer">ver en GitHub <VscGithub aria-hidden="true" style={{ verticalAlign: 'middle' }} /></a>
          </p>
        </section>

        {/* Features — 3 cards max */}
        <section className="landing-features" aria-labelledby="landing-features-title">
          <h2 id="landing-features-title" className="visually-hidden">Funcionalidades principales</h2>
          <div className="landing-features__grid">
            <article className="landing-card">
              <div className="landing-card__icon" aria-hidden="true">
                <VscCreditCard />
              </div>
              <h3>Registra</h3>
              <p>Ingresos y gastos con monto, fecha, descripción y categoría. Todo lo esencial, sin ruido.</p>
            </article>

            <article className="landing-card">
              <div className="landing-card__icon" aria-hidden="true">
                <VscTag />
              </div>
              <h3>Organiza</h3>
              <p>Categorías personalizables por tipo, con color e icono. Tu sistema, tus reglas.</p>
            </article>

            <article className="landing-card">
              <div className="landing-card__icon" aria-hidden="true">
                <VscGraph />
              </div>
              <h3>Planifica</h3>
              <p>Presupuestos por categoría y dashboard con balances al momento. Ve dónde estás parado.</p>
            </article>
          </div>
        </section>

        {/* Trust bar */}
        <section className="landing-trust" aria-label="Información del proyecto">
          <p className="landing-trust__text">
            <span>Demo no comercial</span>
            <span className="landing-trust__dot" aria-hidden="true">·</span>
            <span>Datos de prueba</span>
            <span className="landing-trust__dot" aria-hidden="true">·</span>
            <span>Hosting gratuito</span>
            <span className="landing-trust__dot" aria-hidden="true">·</span>
            <Link to="/legal" className="landing-trust__link">Privacidad y manejo de datos</Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
