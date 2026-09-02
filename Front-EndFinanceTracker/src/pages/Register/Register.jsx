import './Register.css'
import { useSelector } from 'react-redux'
import Loading from '../../components/ui/Loading/Loading'
import RegisterForm from '../../features/loginRegister/components/RegisterForm/RegisterForm'
import { Link } from 'react-router'
import Footer from '../../components/layout/Footer/Footer'
import { useBackendWakeUp } from '../../hooks/useBackendWakeUp'
import WakeUpModal from '../../components/ui/WakeUpModal/WakeUpModal'

const Register = () => {
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
                        <h2>Registro</h2>
                        <p>Unite a una forma más inteligente y segura de gestionar tus finanzas.</p>
                    </div>
                    <div className='tableBorder'></div>
                    <div className='loginBody'>
                        <img className='imgLogin' src="./svg/register.svg" alt="Ilustración de registro en FinTrack" />
                        <RegisterForm />
                    </div>
                    <div className='loginFooter'>
                        <Link to={"/login"}>Ya tengo una cuenta.</Link>
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

export default Register
