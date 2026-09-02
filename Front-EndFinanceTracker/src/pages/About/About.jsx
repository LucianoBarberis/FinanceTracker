import { Link } from 'react-router'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import {
  VscGithub,
  VscGlobe,
  VscServerProcess,
  VscLayers,
  VscPerson,
  VscWarning,
  VscInfo,
  VscHome,
  VscRocket,
  VscLinkExternal,
  VscHeart,
  VscCode,
} from 'react-icons/vsc'
import './About.css'

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flex: 1 }}>
      <Header />
      <main className="about-page" style={{ flex: 1 }}>
        {/* Hero */}
        <div className="about-hero">
          <h1>Sobre FinanceTracker</h1>
          <p>
            Un gestor de finanzas personales creado como proyecto de portfolio para demostrar
            habilidades full-stack. No es un producto comercial ni un servicio financiero regulado:
            es código abierto, honesto y hecho con ganas de aprender.
          </p>
          <div className="about-meta">
            <span>React 19 · ASP.NET Core · .NET 10</span>
            <span>Portfolio / Demo</span>
          </div>
        </div>

        <div className="about-content">
          {/* El proyecto */}
          <section className="about-card" aria-labelledby="about-proyecto">
            <h2 id="about-proyecto">
              El proyecto
            </h2>
            <p>
              FinanceTracker te ayuda a tener claridad sobre tu dinero sin complicaciones:
              registras tus movimientos, los organizas y ves dónde estás parado.
            </p>
            <ul>
              <li>
                <strong>Transacciones:</strong> ingresos y gastos con descripción, importe, fecha y categoría.
              </li>
              <li>
                <strong>Categorías:</strong> personalizables por tipo (ingreso / gasto), con color e icono.
              </li>
              <li>
                <strong>Presupuestos:</strong> define límites por categoría y sigue tu avance.
              </li>
              <li>
                <strong>Dashboard y balances:</strong> resúmenes, gráficos y saldos calculados al momento.
              </li>
              <li>
                <strong>Autenticación segura:</strong> registro e inicio de sesión con JWT + refresh tokens
                hasheados con SHA-256.
              </li>
            </ul>
            <p style={{ marginTop: 12 }}>
              La experiencia está pensada para ser simple y directa, con modo claro/oscuro y
              persistencia de sesión. Sin distracciones, sin venta de datos.
            </p>
          </section>

          {/* Stack técnico */}
          <section className="about-card" aria-labelledby="about-stack">
            <h2 id="about-stack">
              <VscLayers aria-hidden="true" /> Stack técnico
            </h2>
            <p>
              Arquitectura full-stack desplegada en servicios gratuitos, elegida por simplicidad y
              transparencia.
            </p>
            <div className="about-stack-grid">
              <div className="about-stack-card">
                <h3>
                  <VscServerProcess aria-hidden="true" /> Backend
                </h3>
                <ul>
                  <li>ASP.NET Core .NET 10</li>
                  <li>Entity Framework Core</li>
                  <li>PostgreSQL</li>
                  <li>JWT Bearer + refresh tokens (SHA-256)</li>
                  <li>Rate limiting y cabeceras CSP</li>
                </ul>
              </div>
              <div className="about-stack-card">
                <h3>
                  <VscCode aria-hidden="true" /> Frontend
                </h3>
                <ul>
                  <li>React 19 + Vite</li>
                  <li>Redux + Redux Persist</li>
                  <li>React Router</li>
                  <li>Vite PWA</li>
                  <li>Recharts para analíticas</li>
                </ul>
              </div>
              <div className="about-stack-card">
                <h3>
                  <VscGlobe aria-hidden="true" /> Infraestructura
                </h3>
                <ul>
                  <li>Render — API (plan gratuito)</li>
                  <li>Neon — PostgreSQL serverless</li>
                  <li>Vercel — Frontend</li>
                  <li>HTTPS obligatorio</li>
                  <li>Cold start 30–60s en Render</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Por qué existe */}
          <section className="about-card" aria-labelledby="about-porque">
            <h2 id="about-porque">
              Por qué existe
            </h2>
            <p>
              FinanceTracker nació como un ejercicio de aprendizaje.
              Quería construir algo útil, completo y desplegado de punta a punta — no solo un
              CRUD de ejemplo, sino un flujo real con autenticación, persistencia, despliegue y
              cuidado por los detalles.
            </p>
            <ul>
              <li>
                <strong>Portfolio:</strong> mostrar cómo trabajo: arquitectura, decisiones técnicas y
                atención a UX.
              </li>
              <li>
                <strong>Aprendizaje:</strong> practicar integración entre .NET y React, despliegue
                continuo y buenas prácticas de seguridad.
              </li>
              <li>
                <strong>Código abierto:</strong> el repositorio es público para que cualquiera pueda
                revisarlo, aprender o proponer mejoras.
              </li>
            </ul>
          </section>

          {/* Autor */}
          <section className="about-card" aria-labelledby="about-autor">
            <h2 id="about-autor">
              <VscPerson aria-hidden="true" /> Autor
            </h2>
            <div className="about-author">
              <div>
                <p style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 16 }}>Luciano Barberis</p>
                <p>
                  Desarrollador full-stack. Me gusta construir productos simples que resuelven
                  problemas reales, con foco en código mantenible y experiencia cuidada.
                </p>
                <div className="about-author-links">
                  <a
                    href="https://github.com/LucianoBarberis/FinanceTracker"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <VscGithub aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: 6 }} />
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/luciano-barberis-33b641307/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a href="https://lucianobarberis.com.ar" target="_blank" rel="noopener noreferrer">
                    Portfolio
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Aviso demo */}
          <section className="about-card" aria-labelledby="about-aviso">
            <h2 id="about-aviso">
              <VscWarning aria-hidden="true" /> Aviso de demo
            </h2>
            <div className="about-callout about-callout--warn" role="alert">
              <VscWarning aria-hidden="true" />
              <div>
                <strong>Importante:</strong> FinanceTracker está alojado en planes gratuitos. Los datos
                pueden ser eliminados en cualquier momento durante tareas de mantenimiento, y la
                disponibilidad no está garantizada. No lo uses para información sensible ni como único
                respaldo de tus finanzas.
                <br />
                El backend en Render puede tardar 30–60 segundos en despertarse tras inactividad
                (cold start).
              </div>
            </div>
            <p style={{ marginTop: 12 }}>
              Para más detalles sobre qué datos se guardan y dónde, visita la página de{' '}
              <Link to="/legal">privacidad y manejo de datos</Link>.
            </p>
          </section>

          {/* CTA */}
          <section className="about-card" aria-labelledby="about-cta">
            <h2 id="about-cta">Explora el proyecto</h2>
            <p>
              El código es abierto y el despliegue es público. Échale un vistazo, prueba la demo o
              vuelve al inicio para seguir explorando.
            </p>
            <div className="about-actions">
              <a
                className="about-btn about-btn--primary"
                href="https://github.com/LucianoBarberis/FinanceTracker"
                target="_blank"
                rel="noopener noreferrer"
              >
                <VscGithub aria-hidden="true" />
                Ver en GitHub
                <VscLinkExternal aria-hidden="true" />
              </a>
              <Link className="about-btn about-btn--ghost" to="/">
                Volver al inicio
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
