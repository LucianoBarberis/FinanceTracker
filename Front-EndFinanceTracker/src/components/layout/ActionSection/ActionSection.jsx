import { useEffect, useState } from 'react'
import './ActionSection.css'
import ActionCard from '../../ui/ActionCard/ActionCard'
import Modal from '../../ui/Modal/Modal'
import ModalFormInput from '../../ui/ModalFormInput/ModalFormInput'
import { useForm } from '../../../hooks'
import { useDispatch } from 'react-redux'
import { postTransaction } from '../../../redux/actions/postTransactionAction'
import { toast } from '@pheralb/toast'
import { TfiStatsUp } from "react-icons/tfi";
import { TfiStatsDown } from "react-icons/tfi";
import { TfiMoney } from "react-icons/tfi";
import { transactionSchema } from '../../../validation/transactionSchema'
import { getBalances, getEgress, getIncomes } from '../../../redux/actions/getBalancesAction'

const ActionSection = () => {
    const [isOpenAddIncome, setIsOpenIncome] = useState(false)
    const [isOpenAddEgress, setIsOpenEgress] = useState(false)

    const incomeForm = useForm({
        description: '',
        amount: '',
        dateTime: '',
        type: 0,
        categoryId: 3
    }, transactionSchema);

    const egressForm = useForm({
        description: '',
        amount: '',
        dateTime: '',
        type: 1,
        categoryId: 3
    }, transactionSchema);

    const dispatch = useDispatch()

    const handleSubmitIncome = async (e) => {
        e.preventDefault();
        if(!incomeForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        setIsOpenIncome(false)
        await dispatch(postTransaction(incomeForm.valores))
        dispatch(getBalances())
        dispatch(getIncomes())
        dispatch(getEgress())
        incomeForm.resetForm()
        toast.success({
            text: "Transacción creada correctamente!",
        })
    };

    const handleSubmitEgress = async (e) => {
        e.preventDefault();
        if(!egressForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        setIsOpenEgress(false)
        await dispatch(postTransaction(egressForm.valores))
        dispatch(getBalances())
        dispatch(getIncomes())
        dispatch(getEgress())
        egressForm.resetForm()
        toast.success({
            text: "Transacción creada correctamente!",
        })
    };

    useEffect(() => {
        egressForm.resetForm()
        incomeForm.resetForm()
    }, [isOpenAddEgress, isOpenAddIncome])

    return (
        <>
            <section className='ActionCardsContainer'>
                <ActionCard onClick={() => setIsOpenIncome(true)} imgSrc={<TfiStatsUp/>} title={"Añadir un Ingreso"} description={"Crea un ingreso manualmente"} bgColor={"#DCFAE6"} />
                <ActionCard onClick={() => setIsOpenEgress(true)} imgSrc={<TfiStatsDown/>} title={"Añadir un Egreso"} description={"Crea un egreso manualmente"} bgColor={"#FEE4E2"} />
                <ActionCard onClick={() => setIsOpenTrans(true)} imgSrc={<TfiMoney/>} title={"Hacer una transferencia"} description={"Transferi dinero entre tus billeteras"} bgColor={"#e7f1fa"} />
            </section>

            {/* Modal Añadir Ingresos */}
            <Modal
                title="Añadir Ingreso"
                description="Esta acción va a aumentar el capital de tu billetera"
                isOpen={isOpenAddIncome}
                onClose={() => setIsOpenIncome(false)}
            >
                <form onSubmit={handleSubmitIncome} className='FormIncome' autoComplete='off'>
                    <div className='formGroup'>
                        <ModalFormInput name={"Monto"} type={"number"} value={"amount"} useForm={incomeForm} placeholder={"$"}/>
                        <ModalFormInput name={"Fecha"} type={"date"} value={"dateTime"} useForm={incomeForm} placeholder={""}/>
                    </div>
                    <ModalFormInput name={"Descripción"} type={"text"} value={"description"} useForm={incomeForm} placeholder={"Sueldo..."}/>
                    <button className='submitIncome' type="submit">Añadir</button>
                </form>
            </Modal>

            {/* Modal Añadir Egresos*/}
            <Modal
                title="Añadir Egreso"
                description="Esta acción va a disminuir el capital de tu billetera"
                isOpen={isOpenAddEgress}
                onClose={() => setIsOpenEgress(false)}
            >
                <form onSubmit={handleSubmitEgress} className='FormIncome' autoComplete='off'>
                    <div className='formGroup'>
                        <ModalFormInput name={"Monto"} type={"number"} value={"amount"} useForm={egressForm} placeholder={"$"}/>
                        <ModalFormInput name={"Fecha"} type={"date"} value={"dateTime"} useForm={egressForm} placeholder={""}/>
                    </div>
                    <ModalFormInput name={"Descripción"} type={"text"} value={"description"} useForm={egressForm} placeholder={"Sueldo..."}/>
                    <button className='submitEgress' type="submit">Añadir</button>
                </form>
            </Modal>
        </>
    )
}

export default ActionSection