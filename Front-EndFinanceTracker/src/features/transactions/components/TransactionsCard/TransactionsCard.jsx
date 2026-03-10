import './TransactionsCard.css'
import { useEffect, useState, useRef } from 'react'
import { useForm } from '../../../../hooks';
import { LuEllipsisVertical } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../redux/getTransactionAction';
import { deleteTransaction } from '../../redux/deleteTransactionAction';
import { putTransaction } from '../../redux/putTransactionAction';
import { getBalances, getEgress, getIncomes } from '../../../analytics/redux/getBalancesAction';
import { toast } from '@pheralb/toast';
import Modal from '../../../../components/ui/Modal/Modal';
import FormInput from '../../../../components/ui/FormInput/FormInput';
import FormSelect from '../../../../components/ui/FormSelect/FormSelect';
import { getCategories } from '../../../categories/redux/getCategoriesAction';
import { transactionUpdateSchema } from '../../validation/transactionUpdateSchema';

const TransactionsCard = () => {

    const {transacciones, loading} = useSelector((state) => state.transaction)
    const dispatch = useDispatch()
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const [isOpenModalEdit, setOpenModalEdit] = useState(false)
    const catDictionary = useSelector(s => s.categories.catDictionary)
    const optIncomes = useSelector((s) => s.categories.catIncomes)
    const optEgress = useSelector((s) => s.categories.catEgress)
    const menuRef = useRef(null)
    const actionMenuRef = useRef(null)

    const allCategories = [...optIncomes, ...optEgress];

    const editForm = useForm({
        id: null,
        description: '',
        amount: '',
        dateTime: '',
        type: 0,
        categoryId: 0
    }, transactionUpdateSchema(allCategories))
    
    const handleDeleteBtn = async (id) => {
        await dispatch(deleteTransaction(id));
        setOpenMenuIndex(null)
        dispatch(getBalances())
        dispatch(getCategories())
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
        dispatch(getCategories())
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
        dispatch(getCategories())

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const options = [
        {
            value: 0,
            name: "Ingresos"
        },
        {
            value: 1,
            name: "Egresos"
        }
    ]

    return (
    <div className='TransactionsCardContainer'>
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
                        <th>Categoria</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="6" style={{textAlign: 'center'}}>Cargando...</td>
                        </tr>
                    ) : transacciones && transacciones.length > 0 ? (
                        transacciones.map((d, index) => {
                            return <tr key={index}>
                                <td>{d.description}</td>
                                <td>{d.type == 1 ? "Egreso" : "Ingreso" }</td>
                                <td>{catDictionary[d.categoryId]}</td>
                                <td>{d.dateTime.split('T')[0].replaceAll("-", "/")}</td>
                                <td>${d.amount.toLocaleString("es-ES")}</td>
                                <td className='TableAction'>
                                    <button 
                                        className='TableActionBtn'
                                        onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                                    >
                                        <LuEllipsisVertical />
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
                            <td colSpan="6" style={{textAlign: 'center'}}>No hay transacciones</td>
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
                    <FormInput name={"Monto"} type={"number"} value={"amount"} useForm={editForm} placeholder={"$"}/>
                    <FormInput name={"Fecha"} type={"date"} value={"dateTime"} useForm={editForm} placeholder={""}/>
                </div>
                <FormInput name={"Descripción"} type={"text"} value={"description"} useForm={editForm} placeholder={"Sueldo..."}/>
                <FormSelect useForm={editForm} label={"Tipo"} name={"type"} options={options}/>
                <FormSelect useForm={editForm} label={"Categoria"} name={"categoryId"} options={editForm.valores.type == 0 ? optIncomes : optEgress}/>
                <button className='submitIncome' type="submit">Editar</button>
            </form>
        </Modal>
    </div>
    )
}

export default TransactionsCard