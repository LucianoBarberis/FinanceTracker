import Modal from "../../../../components/ui/Modal/Modal"
import FormInput from "../../../../components/ui/FormInput/FormInput"
import FormSelect from "../../../../components/ui/FormSelect/FormSelect"
import { useForm } from "../../../../hooks"
import { useSelector, useDispatch } from "react-redux"
import { postBudget } from "../../redux/postBudgetAction"
import { budgetSchema } from "../../validation/budgetSchema"


const NewBudgetModal = ({isOpen, onClose, setOpen}) => {
    const optEgress = useSelector((s) => s.categories.catEgress)
    const optIncomes = useSelector((s) => s.categories.catIncomes)
    const budgets = useSelector((s) => s.budget.budgets)

    const opciones = optEgress.concat(optIncomes).filter(cat => 
        !budgets.some(budget => budget.categoryId === cat.id)
    )

    const budgetForm = useForm({
        amount: "",
        categoryId: -1
    }, budgetSchema)
    const dispatch = useDispatch()

    const handlerSubmit = (e) => {
        e.preventDefault();
        dispatch(postBudget(budgetForm.valores))
        setOpen(false)
    }

    return (
        <Modal
            title={"Añadir un nuevo límite de presupuesto"}
            description={"El límite te va a ayudar a visualizar tus gastos/ingresos en una categoria especifica"}
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
