import { useForm } from "../../../../hooks"
import FormInput from "../../../../components/ui/FormInput/FormInput"
import { toast } from "@pheralb/toast"
import { useDispatch, useSelector } from "react-redux"      
import { registerSchema } from "../../validation/registerSchema"
import { registerAction } from "../../redux/registerAction"
import { useNavigate } from "react-router"

const RegisterForm = () => {
    const dispatch = useDispatch()
    const { error } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const registerForm = useForm({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }, registerSchema)

    const handlerSubmitRegister = (e) => {
        e.preventDefault()
        if(!registerForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        dispatch(registerAction(registerForm.valores))

        toast.info({
            text: "Validando credenciales..."
        })

        if(error == true) {
            toast.error({
                text: "Error al validar los datos",
            })
        }
        navigate("/")
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