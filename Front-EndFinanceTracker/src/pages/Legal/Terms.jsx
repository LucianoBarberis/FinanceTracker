import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import './Legal.css'
export default function Terms(){
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flex: 1 }}>
      <Header />
      <main className="legal-page" style={{ flex: 1 }}>
        <div className="legal-hero">
          <h1>Términos y condiciones</h1>
          <p>Condiciones de uso de FinTrack. Plantilla lista para que completes tus cláusulas específicas.</p>
          <div className="legal-meta"><span>2 sep 2026</span><span>Contrato</span></div>
        </div>
        <div className="legal-content">
          <section className="legal-card"><h2>Uso del servicio</h2><p>FinTrack se proporciona &quot;tal cual&quot; para gestión financiera personal. No constituye asesoramiento financiero profesional.</p></section>
          <section className="legal-card"><h2>Responsabilidades</h2><p>El usuario es responsable de la veracidad de los datos introducidos y de custodiar sus credenciales.</p></section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
