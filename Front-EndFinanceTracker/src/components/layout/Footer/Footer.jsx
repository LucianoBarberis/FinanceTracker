import { Link, useLocation } from 'react-router'
import { VscGithub, VscAccount, VscShield } from 'react-icons/vsc'
import './Footer.css'

const productLinks = [
  { label: 'Dashboard', to: '/' },
  { label: 'Transacciones', to: '/transactions' },
  { label: 'Categorías', to: '/categories' },
]

const legalLinks = [
  { label: 'Privacidad', to: '/legal/privacidad' },
  { label: 'Tratamiento de datos', to: '/legal/datos' },
  { label: 'Términos y condiciones', to: '/legal/terminos' },
  { label: 'Cookies', to: '/legal/cookies' },
]

const resourceLinks = [
  { label: 'Sobre FinTrack', to: '/about' },
  { label: 'Contacto', to: 'https://lucianobarberis.com.ar', target: '_blank' },
]

export default function Footer() {
  const { pathname } = useLocation()
  const isAuthPage = pathname === '/login' || pathname === '/register'
  const year = new Date().getFullYear()

  return (
    <footer className={`ft-footer ${isAuthPage ? 'ft-footer--muted' : ''}`} role="contentinfo">
      <div className="ft-footer__inner">
        {/* TOP GRID */}
        <div className="ft-footer__grid">
          {/* Brand */}
          <div className="ft-footer__brand">
            <Link to="/" className="ft-footer__logo" aria-label="FinTrack - ir al inicio">
              Fin<span>Track</span>
            </Link>
            <p className="ft-footer__tagline">
              Control total de tus finanzas.<br />
              Privado, seguro y sin letra pequeña.
            </p>

            <div className="ft-footer__social">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="ft-footer__socialBtn">
                <VscGithub />
              </a>
              <a href="https://lucianobarberis.com.ar" target="_blank" aria-label="Email" className="ft-footer__socialBtn">
                <VscAccount />
              </a>
            </div>
          </div>

          {/* Producto */}
          <nav className="ft-footer__col" aria-label="Producto">
            <h4 className="ft-footer__heading">Producto</h4>
            <ul className="ft-footer__links">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="ft-footer__link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal - destacado */}
          <nav className="ft-footer__col ft-footer__col--accent" aria-label="Legal">
            <h4 className="ft-footer__heading">
              <VscShield className="ft-footer__headingIcon" aria-hidden="true" />
              Legal
            </h4>
            <ul className="ft-footer__links">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className={`ft-footer__link ${l.badge ? 'ft-footer__link--highlight' : ''}`}>
                    {l.label}
                    {l.badge && <span className="ft-footer__badge">{l.badge}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Recursos */}
          <nav className="ft-footer__col" aria-label="Recursos">
            <h4 className="ft-footer__heading">Recursos</h4>
            <ul className="ft-footer__links">
              {resourceLinks.map((l) => {
                const isExternal = l.to.startsWith('http')
                return (
                  <li key={l.label}>
                    {isExternal ? (
                      <a href={l.to} target="_blank" rel="noopener noreferrer" className="ft-footer__link">
                        {l.label}
                      </a>
                    ) : (
                      <Link to={l.to} className="ft-footer__link">
                        {l.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        {/* BOTTOM BAR */}
        <div className="ft-footer__bottom">
          <div className="ft-footer__bottomLeft">
            <span className="ft-footer__mono">© {year} FinTrack</span>
          </div>

          <div className="ft-footer__bottomRight">
            <span>Hecho con ganas por <a href="https://lucianobarberis.com.ar" target="_blank">BerisDev</a> ☕ </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
