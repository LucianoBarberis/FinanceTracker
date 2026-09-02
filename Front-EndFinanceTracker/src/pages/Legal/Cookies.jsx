import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import './Legal.css'
export default function Cookies(){
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flex: 1 }}>
      <Header />
      <main className="legal-page" style={{ flex: 1 }}>
        <div className="legal-hero">
          <h1>Cookies</h1>
          <p>Solo esenciales para sesión y preferencias. Sin publicidad ni rastreo cruzado.</p>
          <div className="legal-meta"><span>2 sep 2026</span></div>
        </div>
        <div className="legal-content">
          <section className="legal-card">
            <h2>Qué usamos</h2>
            <table className="legal-table">
              <thead><tr><th>Cookie</th><th>Fin</th><th>Duración</th></tr></thead>
              <tbody>
                <tr><td>ft_session</td><td>Mantener tu sesión iniciada</td><td>Sesión</td></tr>
                <tr><td>ft_theme</td><td>Recordar tema claro/oscuro</td><td>1 año</td></tr>
              </tbody>
            </table>
            <p style={{marginTop:12}}>Puedes rechazar o borrar cookies desde tu navegador sin perder funcionalidad esencial.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
