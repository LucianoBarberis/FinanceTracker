import './Register.css'
import { useSelector } from 'react-redux'
import Loading from '../../components/ui/Loading/Loading'
import RegisterForm from '../../features/loginRegister/components/RegisterForm/RegisterForm'
import { Link } from 'react-router'

const Register = () => {
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
                </div>
            </div>
        </>
    )
}

export default Register
