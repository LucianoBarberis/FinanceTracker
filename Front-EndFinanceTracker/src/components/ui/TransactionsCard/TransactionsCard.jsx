import './TransactionsCard.css'
import { useEffect, useState, useRef } from 'react'
import { useForm } from '../../../hooks';
import { GrMoreVertical } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../../redux/actions/getTransactionAction';
import { deleteTransaction } from '../../../redux/actions/deleteTransactionAction';
import { putTransaction } from '../../../redux/actions/putTransactionAction';
import { getBalances, getEgress, getIncomes } from '../../../redux/actions/getBalancesAction';
import { toast } from '@pheralb/toast';
import { transactionSchema } from '../../../validation/transactionSchema';
import Modal from '../Modal/Modal';
import ModalFormInput from '../ModalFormInput/ModalFormInput';

const TransactionsCard = () => {

    const {transacciones, loading} = useSelector((state) => state.transaction)
    const dispatch = useDispatch()
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const [isOpenModalEdit, setOpenModalEdit] = useState(false)
    const menuRef = useRef(null)
    const actionMenuRef = useRef(null)
    const editForm = useForm({
        id: null,
        description: '',
        amount: '',
        dateTime: '',
        type: 0,
        categoryId: 3
    }, transactionSchema)
    
    const handleDeleteBtn = async (id) => {
        await dispatch(deleteTransaction(id));
        setOpenMenuIndex(null)
        dispatch(getBalances())
        dispatch(getIncomes())
        dispatch(getEgress())
        toast.success({
            text: `Transacción Eliminada`,
            description: `id: ${id}`
        })
    }
    
    const handleEditBtn = (data) => {
        setOpenMenuIndex(null);
        editForm.setValues({
            id: data.id,
            description: data.description,
            amount: data.amount,
            dateTime: data.dateTime ? data.dateTime.split('T')[0] : '',
            type: data.type,
            categoryId: data.categoryId
        });
        setOpenModalEdit(true);
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault()
        if(!editForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        const { id, ...data } = editForm.valores;
        setOpenModalEdit(false)
        await dispatch(putTransaction({ id, data }))
        dispatch(getBalances())
        dispatch(getIncomes())
        dispatch(getEgress())
        toast.success({
            text: `Transacción Editada`,
            description: `id: ${id}`
        })
    }

    useEffect(() => {
        dispatch(getTransactions())
    }, [dispatch])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
                setOpenMenuIndex(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
    <>
        <div className='TransactionsCard' ref={menuRef}>
            <div className="CardTitle">
                <h3>Últimas Transacciones</h3>
                <p>Revisa tus últimas transacciones registradas</p>
            </div>
            <div className="tableBorder"></div>
            <table className='Table'>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Método</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" style={{textAlign: 'center'}}>Cargando...</td>
                        </tr>
                    ) : transacciones && transacciones.length > 0 ? (
                        transacciones.map((d, index) => {
                            return <tr key={index}>
                                <td>{d.description}</td>
                                <td>{d.type == 1 ? "Egreso" : "Ingreso" }</td>
                                <td>{d.dateTime.split('T')[0]}</td>
                                <td>${d.amount}</td>
                                <td className='TableAction'>
                                    <button 
                                        className='TableActionBtn'
                                        onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                                    >
                                        <GrMoreVertical />
                                    </button>
                                    {openMenuIndex === index && (
                                        <div ref={actionMenuRef}>
                                            <div className='ActionMenu'>
                                                <button onClick={()=>handleEditBtn(d)} className='ActionMenuButton edit'>
                                                    Editar
                                                </button>
                                                <button onClick={()=> handleDeleteBtn(d.id)} className='ActionMenuButton delete'>
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        })
                    ) : (
                        <tr>
                            <td colSpan="5" style={{textAlign: 'center'}}>No hay transacciones</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <Modal 
            title="Editar Transacción"
            description="Esta acción va a editar una transacción existente."
            isOpen={isOpenModalEdit}
            onClose={() => setOpenModalEdit(false)}
        >
            <form onSubmit={handleSubmitEdit} className='FormIncome' autoComplete='off'>
                <div className='formGroup'>
                    <ModalFormInput name={"Monto"} type={"number"} value={"amount"} useForm={editForm} placeholder={"$"}/>
                    <ModalFormInput name={"Fecha"} type={"date"} value={"dateTime"} useForm={editForm} placeholder={""}/>
                </div>
                <ModalFormInput name={"Descripción"} type={"text"} value={"description"} useForm={editForm} placeholder={"Sueldo..."}/>
                <div className='formField'>
                    <span className='error' style={{ display: editForm.getFieldError("type") ? 'block' : 'none' }}>
                        {editForm.getFieldError("type") || ''}
                    </span>
                    <span className='label' style={{ display: editForm.getFieldError("type") ? 'none' : 'block' }}>
                        Tipo
                    </span>
                    <select 
                        name="type" 
                        className='inputSelect' 
                        value={editForm.valores.type} 
                        onChange={editForm.handleChange}
                    >
                        <option value="0">Ingreso</option>
                        <option value="1">Egreso</option>
                    </select>
                </div>
                <button className='submitIncome' type="submit">Editar</button>
            </form>
        </Modal>
    </>
    )
}

export default TransactionsCard