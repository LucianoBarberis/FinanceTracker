import Modal from "../../../../components/ui/Modal/Modal"
import FormInput from "../../../../components/ui/FormInput/FormInput"
import { useForm } from "../../../../hooks"
import { useDispatch } from "react-redux"
import { putBudget } from "../../redux/putBudgetAction"
import { budgetSchema } from "../../validation/budgetSchema"
import { toast } from "@pheralb/toast"
import { useEffect } from "react"


const EditBudgetModal = ({isOpen, onClose, setOpen, budget, categoryName}) => {
    const budgetForm = useForm({
        amount: budget?.amount || "",
        budgetId: budget?.budgetId || -1
    }, budgetSchema)
    const dispatch = useDispatch()

    const handlerSubmit = async (e) => {
        e.preventDefault();
        console.log(budgetForm.valores)
        if(!budgetForm.validar()) return(
            toast.error({
                text: "Error al validar la información"
            })
        )
        
        const result = await dispatch(putBudget(budgetForm.valores))
        if (!result.error) {
            toast.success({
                text: "Presupuesto actualizado correctamente"
            })
            setOpen(false)
        }else {
            toast.error({
                text: "Error del servidor"
            })
        }
    }

    useEffect(()=>{
        if (budget) {
            budgetForm.setValues({
                amount: budget.amount,
                categoryId: budget.categoryId,
                budgetId: budget.id
            })
        }
    },[isOpen, budget])

    return (
        <Modal
            title={"Editar límite de presupuesto"}
            description={`Modificando el presupuesto para la categoría: ${categoryName}`}
            isOpen={isOpen}
            onClose={onClose}
        >
            <form className="FormIncome" onSubmit={handlerSubmit}>
                <FormInput useForm={budgetForm} name={"Monto Límite"} type={"number"} value={"amount"} placeholder={"$25.000"}/>
                <button className='submitIncome' type="submit">Actualizar</button>
            </form>
        </Modal>
    )
}

export default EditBudgetModal
