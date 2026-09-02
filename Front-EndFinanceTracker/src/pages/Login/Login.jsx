import './Login.css'
import LoginForm from '../../features/loginRegister/components/LoginForm/LoginForm'
import { useSelector } from 'react-redux'
import Loading from '../../components/ui/Loading/Loading'
import { Link } from 'react-router'
import Footer from '../../components/layout/Footer/Footer'
import { useBackendWakeUp } from '../../hooks/useBackendWakeUp'
import WakeUpModal from '../../components/ui/WakeUpModal/WakeUpModal'

const Login = () => {
    const { loading } = useSelector(state => state.auth)
    const { status, attempts, maxAttempts, retry } = useBackendWakeUp()
    const isBackendAwake = status === 'awake'
    if (!isBackendAwake) {
        return <WakeUpModal status={status} attempts={attempts} maxAttempts={maxAttempts} onRetry={retry} />
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flex: 1 }}>
            <div className='loginContainer' style={{ flex: 1 }}>
                {
                    loading ?
                        <div className='loadingContainer'>
                            <Loading size="md" />
                        </div>
                        : null
                }
                <div className={`loginWrapper ${loading ? "blur" : ""}`}>
                    <div className="loginHeader">
                        <h2>Iniciar Sesión</h2>
                        <p>Bienvenido de nuevo. Tus finanzas te extrañaban.</p>
                    </div>
                    <div className='tableBorder'></div>
                    <div className='loginBody'>
                        <LoginForm />
                        <img className='imgLogin' src="./svg/login.svg" alt="Ilustración de inicio de sesión en FinTrack" />
                    </div>
                    <div className='loginFooter'>
                        <Link to={"/register"}>Ya te creaste una cuenta?</Link>
                    </div>
                    <div className='loginLegal'>
                        <Link to="/legal/datos">Privacidad y manejo de datos</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Login
