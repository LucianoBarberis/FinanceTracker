import { useForm } from "../../../../hooks"
import FormInput from "../../../../components/ui/FormInput/FormInput"
import { toast } from "@pheralb/toast"
import './LoginForm.css'
import { useDispatch } from "react-redux"      
import { loginAction } from "../../redux/loginAction"       
import { loginSchema } from "../../validation/loginSchema"
import { useNavigate } from "react-router"
import { refreshDashboardData } from '../../../analytics/redux/refreshDashboardData'

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const loginForm = useForm({
        userIdentify: "",
        password: ""
    }, loginSchema)

    const handlerSubmitLogin = async (e) => {
        e.preventDefault()
        if(!loginForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });

        try {
            await dispatch(loginAction(loginForm.valores)).unwrap()
            dispatch(refreshDashboardData())
            toast.success({text: "Bienvenido..."})
            navigate("/")
        } catch (error) {
            toast.error({ text: error || "Credenciales incorrectas" });
        }
        loginForm.resetForm()
    }
    
    return (
        <>
            <form className="LoginForm" onSubmit={handlerSubmitLogin} autoComplete="off">
                <FormInput name={"Nombre"} value={"userIdentify"} useForm={loginForm} type={"text"} placeholder={"Nombre..."}/>
                <FormInput name={"Contraseña"} value={"password"} useForm={loginForm} type={"password"} placeholder={"********"}/>
                <button type="submit" className="btnSucces">Entrar</button>
            </form>
        </>
    )
}

export default LoginForm
