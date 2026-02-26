import React, { useEffect } from 'react'
import './ActionSection.css'
import ActionCard from '../../ui/ActionCard/ActionCard'
import Modal from '../../ui/Modal/Modal'
import { useForm } from '../../../hooks'
import { useDispatch } from 'react-redux'
import { postTransaction } from '../../../redux/actions/postTransactionAction'
import { toast } from '@pheralb/toast'
import z from 'zod'

const ActionSection = () => {
    const [isOpenAddIncome, setIsOpenIncome] = React.useState(false)
    const [isOpenAddEgress, setIsOpenEgress] = React.useState(false)

    const transactionSchema = z.object({
        description: z
            .string()
            .min(1, "La descripción es obligatoria.")
            .min(3, "Mínimo 3 caracteres.")
            .max(200, "Máximo 200 caracteres.")
            .refine((val) => !/<.*?>/.test(val), "No se permite HTML."),

        amount: z.coerce // Coerce convierte el string del input a número
            .number({ invalid_type_error: "El importe es obligatorio." })
            .gt(0, "El importe debe ser mayor a 0."),

        categoryId: z.coerce
            .number()
            .gt(0, "Selecciona una categoría válida."),

        dateTime: z.coerce
            .date({ errorMap: () => ({ message: "Fecha obligatoria." }) })
            .max(new Date(), "No puedes usar fechas futuras."),
    });

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

    const handleSubmitIncome = (e) => {
        e.preventDefault();
        if(!incomeForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        dispatch(postTransaction(incomeForm.valores))
        incomeForm.resetForm()
        setIsOpenIncome(false)
        toast.success({
            text: "Transacción creada correctamente!",
        })
    };

    const handleSubmitEgress = (e) => {
        e.preventDefault();
        if(!egressForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        dispatch(postTransaction(egressForm.valores))
        egressForm.resetForm()
        setIsOpenEgress(false)
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
                <ActionCard onClick={() => setIsOpenIncome(true)} title={"Añadir un Ingreso"} description={"Crea un ingreso manualmente"} bgColor={"#DCFAE6"} />
                <ActionCard onClick={() => setIsOpenEgress(true)} title={"Añadir un Egreso"} description={"Crea un egreso manualmente"} bgColor={"#FEE4E2"} />
                <ActionCard onClick={() => setIsOpenTrans(true)} title={"Hacer una transferencia"} description={"Transferi dinero entre tus billeteras"} bgColor={"#e7f1fa"} />
            </section>

            {/* Modal Añadir Ingresos */}
            <Modal
                title="Añadir Ingreso"
                description="Esta acción va a aumentar el capital de tu billetera"
                isOpen={isOpenAddIncome}
                onClose={() => setIsOpenIncome(false)}
            >
                <form onSubmit={handleSubmitIncome} className='FormIncome'>
                    <div className='formGroup'>
                        <div className='formField'>
                            <span className='error' style={{ display: incomeForm.getFieldError('amount') ? 'block' : 'none' }}>
                                {incomeForm.getFieldError('amount') || ''}
                            </span>
                            <span className='label' style={{ display: incomeForm.getFieldError('amount') ? 'none' : 'block' }}>
                                Monto
                            </span>
                            <input
                                onChange={incomeForm.handleChange}
                                value={incomeForm.valores.amount}
                                type="number"
                                placeholder='$'
                                name='amount'
                                className={incomeForm.getFieldError('amount')?.length > 0 ? "errorInput" : ""}
                            />
                        </div>
                        <div className='formField'>
                            <span className='error' style={{ display: incomeForm.getFieldError('dateTime') ? 'block' : 'none' }}>
                                {incomeForm.getFieldError('dateTime') || ''}
                            </span>
                            <span className='label' style={{ display: incomeForm.getFieldError('dateTime') ? 'none' : 'block' }}>
                                Fecha
                            </span>
                            <input
                                onChange={incomeForm.handleChange}
                                value={incomeForm.valores.dateTime}
                                type="date"
                                name="dateTime"
                                className={incomeForm.getFieldError('dateTime')?.length > 0 ? "errorInput" : ""}
                            />
                        </div>
                    </div>
                    <div className='formField'>
                        <span className='error' style={{ display: incomeForm.getFieldError('description') ? 'block' : 'none' }}>
                            {incomeForm.getFieldError('description') || ''}
                        </span>
                        <span className='label' style={{ display: incomeForm.getFieldError('description') ? 'none' : 'block' }}>
                            Descripción
                        </span>
                        <input
                            onChange={incomeForm.handleChange}
                            value={incomeForm.valores.description}
                            type="text"
                            placeholder='Sueldo...'
                            name='description'
                            className={incomeForm.getFieldError('description')?.length > 0 ? "errorInput" : ""}
                        />
                    </div>
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
                <form onSubmit={handleSubmitEgress} className='FormIncome'>
                    <div className='formGroup'>
                        <div className='formField'>
                            <span className='error' style={{ display: egressForm.getFieldError('amount') ? 'block' : 'none' }}>
                                {egressForm.getFieldError('amount') || ''}
                            </span>
                            <span className='label' style={{ display: egressForm.getFieldError('amount') ? 'none' : 'block' }}>
                                Monto
                            </span>
                            <input
                                onChange={egressForm.handleChange}
                                value={egressForm.valores.amount}
                                type="number"
                                placeholder='$'
                                name='amount'
                                className={egressForm.getFieldError('amount')?.length > 0 ? "errorInput" : ""}
                            />
                        </div>
                        <div className='formField'>
                            <span className='error' style={{ display: egressForm.getFieldError('dateTime') ? 'block' : 'none' }}>
                                {egressForm.getFieldError('dateTime') || ''}
                            </span>
                            <span className='label' style={{ display: egressForm.getFieldError('dateTime') ? 'none' : 'block' }}>
                                Fecha
                            </span>
                            <input
                                onChange={egressForm.handleChange}
                                value={egressForm.valores.dateTime}
                                type="date"
                                name="dateTime"
                                className={egressForm.getFieldError('dateTime')?.length > 0 ? "errorInput" : ""}
                            />
                        </div>
                    </div>
                    <div className='formField'>
                        <span className='error' style={{ display: egressForm.getFieldError('description') ? 'block' : 'none' }}>
                            {egressForm.getFieldError('description') || ''}
                        </span>
                        <span className='label' style={{ display: egressForm.getFieldError('description') ? 'none' : 'block' }}>
                            Descripción
                        </span>
                        <input
                            onChange={egressForm.handleChange}
                            value={egressForm.valores.description}
                            type="text"
                            placeholder='Salida con amigos...'
                            name='description'
                            className={egressForm.getFieldError('description')?.length > 0 ? "errorInput" : ""}
                        />
                    </div>
                    <button className='submitEgress' type="submit">Añadir</button>
                </form>
            </Modal>
        </>
    )
}

export default ActionSection
