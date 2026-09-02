import Modal from "../../../../components/ui/Modal/Modal"
import FormInput from "../../../../components/ui/FormInput/FormInput"
import FormSelect from "../../../../components/ui/FormSelect/FormSelect"
import { useForm } from "../../../../hooks"
import { useSelector, useDispatch } from "react-redux"
import { postBudget } from "../../redux/postBudgetAction"
import { budgetSchema } from "../../validation/budgetSchema"
import { toast } from "@pheralb/toast"
import { useEffect } from "react"
import { selectCatEgress } from "../../../categories/redux/categoriesReducer"
import { selectBudgets } from "../../redux/budgetReducer"


const NewBudgetModal = ({isOpen, onClose, setOpen}) => {
    const optEgress = useSelector(selectCatEgress)
    const budgets = useSelector(selectBudgets)

    const opciones = optEgress?.filter(cat => 
        !budgets?.some(budget => budget.categoryId === cat.id)
    ) || []

    const budgetForm = useForm({
        amount: "",
        categoryId: -1
    }, budgetSchema)
    const dispatch = useDispatch()

    const handlerSubmit = async (e) => {
        e.preventDefault();
        if(!budgetForm.validar()) return(
            toast.error({
                text: "Error al validar la información"
            })
        )
        const result = await dispatch(postBudget(budgetForm.valores))
        if (!result.error) {
            toast.success({
                text: "Presupuesto añadido correctamente"
            })
            setOpen(false)
        }
    }

    useEffect(()=> {

    },[])

    useEffect(()=>{
        budgetForm.resetForm()
    },[isOpen])

    return (
        <Modal
            title={"Añadir un nuevo límite de presupuesto"}
            description={"El límite te va a ayudar a visualizar tus gastos en una categoria especifica"}
            isOpen={isOpen}
            onClose={onClose}
        >
            <form className="FormIncome" onSubmit={handlerSubmit}>
                <FormInput useForm={budgetForm} name={"Monto Límite"} type={"number"} value={"amount"} placeholder={"$25.000"}/>
                <FormSelect useForm={budgetForm} name={"categoryId"} label={"Categoría"} options={opciones} />
                <button className='submitIncome' type="submit">Añadir</button>
            </form>
        </Modal>
    )
}

export default NewBudgetModal
