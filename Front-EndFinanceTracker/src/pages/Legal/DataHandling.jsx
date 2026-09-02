import { Link } from 'react-router'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import { VscShield, VscDatabase, VscLock, VscLaw, VscMail, VscTrash, VscEye } from 'react-icons/vsc'
import './Legal.css'

export default function DataHandling() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flex: 1 }}>
      <Header />
      <main className="legal-page" style={{ flex: 1 }}>
        <div className="legal-hero">
          <h1>Cómo tratamos tus datos</h1>
          <p>
            En FinTrack tu información financiera es sagrada. No vendemos datos, no hacemos perfilado publicitario
            y minimizamos todo lo que recogemos.
          </p>
          <div className="legal-meta">
            <span>Actualizado: 2 sep 2026</span>
          </div>
        </div>

        <div className="legal-content">
          <section className="legal-card">
            <h2><VscEye /> Qué datos almacenamos</h2>
            <p>Principio de minimización: solo lo imprescindible para que la app funcione.</p>
            <table className="legal-table">
              <thead><tr><th>Dato</th><th>Por qué</th><th>¿Obligatorio?</th></tr></thead>
              <tbody>
                <tr><td>Email y nombre</td><td>Crear tu cuenta y recuperar acceso</td><td>Sí</td></tr>
                <tr><td>Transacciones, categorías y presupuestos</td><td>Núcleo del producto</td><td>Sí, si usas la app</td></tr>
                <tr><td>IP y logs técnicos</td><td>Seguridad y prevención de fraude (30 días)</td><td>Automático</td></tr>
                <tr><td>Preferencias (tema, moneda)</td><td>Experiencia</td><td>No</td></tr>
              </tbody>
            </table>
            <div className="legal-callout" style={{marginTop:14}}>
              <strong>No recogemos:</strong> geolocalización precisa, contactos, datos bancarios vía scraping, ni vendemos nada a terceros.
            </div>
          </section>

          <section className="legal-card">
            <h2><VscLaw /> Base legal</h2>
            <p>Tratamos tus datos bajo estas bases del RGPD:</p>
            <ul>
              <li><strong>Ejecución de contrato</strong> — para darte el servicio que solicitas (gestión financiera).</li>
              <li><strong>Interés legítimo</strong> — seguridad, prevención de abuso y mejora de estabilidad.</li>
              <li><strong>Consentimiento</strong> — cookies no esenciales y comunicaciones opcionales. Retirable en cualquier momento.</li>
            </ul>
            <h3>¿Compartimos datos?</h3>
            <p>No. No hay venta ni cesión. Solo encargados de tratamiento (hosting, email transaccional) con contratos DPA y sin acceso a tu contenido financiero en claro.</p>
          </section>

          <section className="legal-card">
            <h2><VscDatabase /> Dónde y cuánto tiempo</h2>
            <ul>
              <li><strong>Ubicación:</strong> UE (Frankfurt). Copias cifradas con redundancia. Sin transferencias fuera del EEE sin garantías.</li>
              <li><strong>Retención:</strong> datos de cuenta mientras seas usuario. Al borrar cuenta, eliminación en 30 días (salvo obligación legal de 6 años para facturación, si aplica).</li>
              <li><strong>Logs:</strong> 30 días. Backups cifrados: 14 días.</li>
            </ul>
          </section>

          <section className="legal-card">
            <h2><VscLock /> Cómo los protegemos</h2>
            <ul>
              <li>Cifrado en tránsito (TLS 1.3) y en reposo (AES-256).</li>
              <li>Contraseñas hasheadas con Argon2id, nunca en claro.</li>
              <li>Acceso interno con principio de mínimo privilegio y 2FA obligatorio.</li>
              <li>Monitorización y auditorías periódicas. Notificación de brechas en 72h si te afectan.</li>
            </ul>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  )
}
