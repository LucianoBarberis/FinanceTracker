import './Login.css'
import LoginForm from '../../features/loginRegister/components/LoginForm/LoginForm'
import { useSelector } from 'react-redux'
import Loading from '../../components/ui/Loading/Loading'
import { Link } from 'react-router'

const Login = () => {
    const { loading } = useSelector(state => state.auth)
    return (
        <>
            <div className='loginContainer'>
                {
                    loading ?
                        <div className='loadingContainer'>
                            <Loading />
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
                </div>
            </div>
        </>
    )
}
export default Login
