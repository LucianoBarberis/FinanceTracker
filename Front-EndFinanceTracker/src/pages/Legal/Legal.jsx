import { Link } from 'react-router'
import {
  VscShield,
  VscDatabase,
  VscServerProcess,
  VscLock,
  VscGlobe,
  VscAccount,
  VscTrash,
  VscWarning,
  VscMail,
  VscCalendar,
  VscArrowLeft,
  VscInfo,
} from 'react-icons/vsc'
import './Legal.css'
import Footer from '../../components/layout/Footer/Footer'

const LAST_UPDATE = '2 de septiembre de 2026'

const Legal = () => {
  return (
    <main className="legalPage">
      <div className="legalContainer">
        <Link to="/" className="legalBackLink" aria-label="Volver al inicio">
          <VscArrowLeft aria-hidden="true" />
          Volver al inicio
        </Link>

        <article className="legalArticle" aria-labelledby="legal-title">
          <header className="legalHeader">
            <span className="legalBadge">
              <VscInfo aria-hidden="true" />
              Proyecto de portfolio &middot; Demo no comercial
            </span>
            <h1 id="legal-title">Privacidad y manejo de datos</h1>
            <p className="legalSubtitle">
              FinanceTracker es un proyecto personal de portfolio para demostrar habilidades en desarrollo
              full-stack. No es un producto comercial ni un servicio financiero regulado. Esta página explica,
              de forma clara y sin letra pequeña, qué datos se recopilan, dónde se guardan y cómo se protegen.
            </p>
            <p className="legalMeta">
              <VscCalendar aria-hidden="true" />
              Última actualización: <time dateTime="2026-09-02">{LAST_UPDATE}</time>
            </p>
          </header>

          <div className="legalCallout" role="note" aria-label="Aviso importante">
            <VscWarning aria-hidden="true" className="legalCalloutIcon" />
            <div>
              <strong>Aviso de demo:</strong> Al estar alojado en servicios gratuitos, los datos pueden ser
              eliminados en cualquier momento y la disponibilidad no está garantizada. No utilices FinanceTracker
              para información sensible o como único respaldo de tus finanzas.
            </div>
          </div>

          <nav className="legalToc" aria-label="Índice de contenidos">
            <p className="legalTocTitle">En esta página</p>
            <ol>
              <li><a href="#que-recopilamos">Qué datos se recopilan</a></li>
              <li><a href="#donde-se-almacenan">Dónde se almacenan</a></li>
              <li><a href="#como-se-protegen">Cómo se protegen</a></li>
              <li><a href="#uso-datos">Uso de los datos</a></li>
              <li><a href="#cookies-localstorage">Cookies y almacenamiento local</a></li>
              <li><a href="#derechos">Tus derechos</a></li>
              <li><a href="#hosting">Hosting gratuito y disponibilidad</a></li>
              <li><a href="#contacto">Contacto</a></li>
            </ol>
          </nav>

          <section id="que-recopilamos" className="legalSection" aria-labelledby="h-que-recopilamos">
            <div className="legalSectionHeader">
              <span className="legalIconBox" aria-hidden="true"><VscDatabase /></span>
              <h2 id="h-que-recopilamos">Qué datos se recopilan</h2>
            </div>
            <p>
              Solo se recopila lo necesario para que la aplicación funcione. No hay analítica de terceros
              ni rastreadores publicitarios.
            </p>
            <div className="legalTableWrap" role="region" aria-label="Tabla de datos recopilados" tabIndex={0}>
              <table className="legalTable">
                <thead>
                  <tr>
                    <th scope="col">Categoría</th>
                    <th scope="col">Datos</th>
                    <th scope="col">Finalidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Cuenta</th>
                    <td>Nombre de usuario, email, contraseña (hasheada)</td>
                    <td>Crear y autenticar tu sesión</td>
                  </tr>
                  <tr>
                    <th scope="row">Autenticación</th>
                    <td>JWT y refresh token (hasheado con SHA-256)</td>
                    <td>Mantener tu sesión segura</td>
                  </tr>
                  <tr>
                    <th scope="row">Finanzas</th>
                    <td>Transacciones (descripción, importe, fecha), saldos calculados</td>
                    <td>Mostrar tu actividad y balances</td>
                  </tr>
                  <tr>
                    <th scope="row">Organización</th>
                    <td>Categorías y presupuestos que creas</td>
                    <td>Clasificar y planificar tus gastos</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="legalNote">
              No se recopilan datos de pago, tarjetas bancarias, documentos de identidad ni información de terceros.
              Tampoco se usa analítica como Google Analytics, Hotjar u otros.
            </p>
          </section>

          <section id="donde-se-almacenan" className="legalSection" aria-labelledby="h-donde-se-almacenan">
            <div className="legalSectionHeader">
              <span className="legalIconBox" aria-hidden="true"><VscGlobe /></span>
              <h2 id="h-donde-se-almacenan">Dónde se almacenan</h2>
            </div>
            <p>
              La arquitectura es simple y transparente:
            </p>
            <ul className="legalList">
              <li>
                <strong>Base de datos:</strong> PostgreSQL en <strong>Neon</strong> (región EU / US según el
                despliegue gratuito). Allí se guardan usuarios, transacciones, categorías y presupuestos.
              </li>
              <li>
                <strong>Backend:</strong> API en <strong>ASP.NET Core (.NET 10)</strong> desplegada en{' '}
                <strong>Render</strong> (plan gratuito).
              </li>
              <li>
                <strong>Frontend:</strong> Aplicación en <strong>React 19 + Vite</strong> desplegada en{' '}
                <strong>Vercel</strong>.
              </li>
              <li>
                <strong>Dispositivo:</strong> El token de acceso y el refresh token se guardan en{' '}
                <code>localStorage</code> de tu navegador para mantener la sesión entre recargas.
              </li>
            </ul>
            <p className="legalNote">
              No hay réplicas fuera de estos proveedores ni cesiones a terceros. Si en el futuro se añaden
              servicios adicionales, esta página se actualizará.
            </p>
          </section>

          <section id="como-se-protegen" className="legalSection" aria-labelledby="h-como-se-protegen">
            <div className="legalSectionHeader">
              <span className="legalIconBox" aria-hidden="true"><VscLock /></span>
              <h2 id="h-como-se-protegen">Cómo se protegen</h2>
            </div>
            <ul className="legalList">
              <li><strong>Contraseñas hasheadas:</strong> nunca se almacenan en texto plano.</li>
              <li><strong>Refresh tokens hasheados con SHA-256</strong> en base de datos.</li>
              <li><strong>Autenticación JWT Bearer</strong> con expiración corta y renovación por refresh token.</li>
              <li><strong>HTTPS obligatorio</strong> en todas las comunicaciones (Render y Vercel).</li>
              <li><strong>Cabeceras de seguridad:</strong> Content Security Policy y rate limiting en el backend.</li>
              <li><strong>Aislamiento por usuario:</strong> cada usuario solo puede acceder a sus propios datos.</li>
            </ul>
            <p className="legalNote">
              Aun con estas medidas, ningún sistema es 100&nbsp;% invulnerable. Al ser un proyecto de portfolio
              sin auditoría externa, se recomienda no almacenar información altamente sensible.
            </p>
          </section>

          <section id="uso-datos" className="legalSection" aria-labelledby="h-uso-datos">
            <div className="legalSectionHeader">
              <span className="legalIconBox" aria-hidden="true"><VscServerProcess /></span>
              <h2 id="h-uso-datos">Uso de los datos</h2>
            </div>
            <p>Tus datos se usan exclusivamente para:</p>
            <ul className="legalList">
              <li>Permitir el registro, inicio de sesión y cierre de sesión.</li>
              <li>Crear, editar y visualizar tus transacciones, categorías y presupuestos.</li>
              <li>Calcular saldos, resúmenes y gráficos del dashboard.</li>
            </ul>
            <p className="legalHighlight">
              No se venden, no se comparten con terceros y no se usan para publicidad. No hay newsletters
              ni envíos comerciales.
            </p>
          </section>

          <section id="cookies-localstorage" className="legalSection" aria-labelledby="h-cookies">
            <div className="legalSectionHeader">
              <span className="legalIconBox" aria-hidden="true"><VscShield /></span>
              <h2 id="h-cookies">Cookies y almacenamiento local</h2>
            </div>
            <p>
              FinanceTracker <strong>no utiliza cookies de terceros ni píxeles de seguimiento</strong>.
              Únicamente se usa el almacenamiento local del navegador:
            </p>
            <ul className="legalList">
              <li>
                <code>localStorage</code>: guarda el <strong>JWT</strong> y el <strong>refresh token</strong> para
                mantener tu sesión. Se elimina al cerrar sesión.
              </li>
              <li>
                <code>redux-persist</code> puede guardar estado no sensible (preferencia de tema) en el navegador.
              </li>
            </ul>
            <p className="legalNote">
              Puedes borrar estos datos en cualquier momento desde la configuración de tu navegador
              o cerrando sesión en la aplicación. Si bloqueas el almacenamiento local, no podrás mantener la sesión.
            </p>
          </section>

          <section id="derechos" className="legalSection" aria-labelledby="h-derechos">
            <div className="legalSectionHeader">
              <span className="legalIconBox" aria-hidden="true"><VscAccount /></span>
              <h2 id="h-derechos">Tus derechos</h2>
            </div>
            <p>
              Tienes derecho a acceder, rectificar y eliminar tus datos en cualquier momento:
            </p>
            <ul className="legalList">
              <li><strong>Acceso y rectificación:</strong> puedes editar tu información directamente en la app.</li>
              <li><strong>Eliminación:</strong> puedes solicitar el borrado de tu cuenta y todos los datos asociados.</li>
              <li><strong>Portabilidad:</strong> si necesitas exportar tus transacciones, puedes solicitarlo por contacto.</li>
            </ul>
            <div className="legalActionBox">
              <VscTrash aria-hidden="true" />
              <div>
                <strong>¿Quieres eliminar tus datos?</strong>
                <p>
                  Usa la opción &quot;Cerrar sesión&quot; y contacta por el canal indicado abajo solicitando la
                  eliminación. Se procesará manualmente al ser un proyecto de portfolio sin panel de
                  administración automatizado.
                </p>
              </div>
            </div>
          </section>

          <section id="hosting" className="legalSection" aria-labelledby="h-hosting">
            <div className="legalSectionHeader">
              <span className="legalIconBox legalIconBox--warn" aria-hidden="true"><VscWarning /></span>
              <h2 id="h-hosting">Hosting gratuito y disponibilidad</h2>
            </div>
            <p>
              Al estar desplegado en planes gratuitos de Render, Neon y Vercel:
            </p>
            <ul className="legalList">
              <li>
                <strong>Cold start:</strong> el backend en Render puede tardar hasta 30–60 segundos en despertarse
                tras un periodo de inactividad.
              </li>
              <li><strong>Disponibilidad no garantizada:</strong> pueden existir caídas o reinicios sin previo aviso.</li>
              <li>
                <strong>Pérdida de datos:</strong> al ser una base de datos de demo, los datos pueden ser borrados
                durante tareas de mantenimiento o para reiniciar el portfolio.
              </li>
              <li><strong>Sin SLA ni soporte 24/7:</strong> es un proyecto de aprendizaje, no un servicio con compromiso de disponibilidad.</li>
            </ul>
          </section>

          <section id="contacto" className="legalSection" aria-labelledby="h-contacto">
            <div className="legalSectionHeader">
              <span className="legalIconBox" aria-hidden="true"><VscMail /></span>
              <h2 id="h-contacto">Contacto</h2>
            </div>
            <p>
              Si tienes dudas sobre esta política, quieres ejercer tus derechos o reportar un problema:
            </p>
            <div className="legalContactBox">
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:hola@fintrack-demo.local">hola@fintrack-demo.local</a>{' '}
                <span className="legalPlaceholder">(reemplaza por tu email real)</span>
              </p>
              <p>
                <strong>GitHub:</strong>{' '}
                <a href="https://github.com/tu-usuario/FinanceTracker" target="_blank" rel="noopener noreferrer">
                  github.com/tu-usuario/FinanceTracker
                </a>{' '}
                <span className="legalPlaceholder">(reemplaza por tu repositorio)</span>
              </p>
              <p className="legalNote" style={{ marginTop: '12px', marginBottom: 0 }}>
                Tip: actualiza estos enlaces antes de compartir el portfolio. Si prefieres, puedes dejar solo el
                enlace a GitHub y eliminar la línea de email.
              </p>
            </div>
          </section>

          <footer className="legalFooter">
            <p>
              Esta política se rige por un enfoque de transparencia propio de un proyecto de portfolio.
              No sustituye asesoramiento legal profesional. Si conviertes el proyecto en un producto comercial,
              deberás adaptarla a la normativa aplicable (por ejemplo, RGPD).
            </p>
            <Link to="/" className="legalCta">Volver a FinanceTracker</Link>
          </footer>
        </article>
      </div>
      <Footer />
    </main>
  )
}

export default Legal
