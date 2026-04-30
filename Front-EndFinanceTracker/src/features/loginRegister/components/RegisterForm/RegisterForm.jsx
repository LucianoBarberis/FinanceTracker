import { useForm } from "../../../../hooks"
import FormInput from "../../../../components/ui/FormInput/FormInput"
import { toast } from "@pheralb/toast"
import { useDispatch } from "react-redux"      
import { registerSchema } from "../../validation/registerSchema"
import { registerAction } from "../../redux/registerAction"
import { useNavigate } from "react-router"
import { refreshDashboardData } from '../../../analytics/redux/refreshDashboardData'

const RegisterForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const registerForm = useForm({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }, registerSchema)

    const handlerSubmitRegister = async (e) => {
        e.preventDefault()
        if(registerForm.valores.password != registerForm.valores.confirmPassword) {
            return( registerForm.setErrores((prevErrors) => ({
                ...prevErrors,
                confirmPassword: "Las contraseñas son diferentes"
            })),
            toast.error({text: "Error al validar los datos",})
        )
        }
        if(!registerForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        try {
            await dispatch(registerAction(registerForm.valores)).unwrap()
            dispatch(refreshDashboardData())
            toast.success({text: "Usuario registrado!"})
            navigate("/")
        } catch (error) {
            toast.error({ text: error || "Credenciales incorrectas" });
        }
        
        registerForm.resetForm()
    }
    
    return (
        <>
            <form className="LoginForm" onSubmit={handlerSubmitRegister} autoComplete="off">
                <FormInput name={"Nombre"} value={"userName"} useForm={registerForm} type={"text"} placeholder={"Nombre..."}/>
                <FormInput name={"E-Mail"} value={"email"} useForm={registerForm} type={"email"} placeholder={"ejemplo@fintrack.com"}/>
                <FormInput name={"Contraseña"} value={"password"} useForm={registerForm} type={"password"} placeholder={"********"}/>
                <FormInput name={"Repetir Contraseña"} value={"confirmPassword"} useForm={registerForm} type={"password"} placeholder={"********"}/>
                <button type="submit" className="btnSucces">Registrarse</button>
            </form>
        </>
    )
}

export default RegisterForm