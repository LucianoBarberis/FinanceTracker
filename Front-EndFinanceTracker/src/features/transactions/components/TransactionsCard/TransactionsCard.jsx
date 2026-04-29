import React from 'react'
import './TransactionsCard.css'
import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useForm } from '../../../../hooks';
import { LuEllipsisVertical } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../redux/getTransactionAction';
import { deleteTransaction } from '../../redux/deleteTransactionAction';
import { putTransaction } from '../../redux/putTransactionAction';
import { refreshDashboardData } from '../../../analytics/redux/refreshDashboardData';
import { getBudgets } from '../../../budget/redux/getBudgetsAction';
import { toast } from '@pheralb/toast';
import Modal from '../../../../components/ui/Modal/Modal';
import FormInput from '../../../../components/ui/FormInput/FormInput';
import FormSelect from '../../../../components/ui/FormSelect/FormSelect';
import { selectTransactions, selectTransactionsLoading } from '../../redux/transactionReducer';
import { selectCatDictionary, selectCatIncomes, selectCatEgress } from '../../../categories/redux/categoriesReducer';
import { transactionUpdateSchema } from '../../validation/transactionUpdateSchema';

const TransactionsCard = React.memo(({transactionsToRender, data}) => {
    const reduxTransactions = useSelector(selectTransactions)
    const loading = useSelector(selectTransactionsLoading)
    const transacciones = data || reduxTransactions;
    const dispatch = useDispatch()
    const catDictionary = useSelector(selectCatDictionary)
    const optIncomes = useSelector(selectCatIncomes)
    const optEgress = useSelector(selectCatEgress)
    const menuRef = useRef(null)
    const actionMenuRef = useRef(null)
    const [openMenuIndex, setOpenMenuIndex] = useState(null)
    const [isOpenModalEdit, setOpenModalEdit] = useState(false)

    const allCategories = useMemo(() => [...optIncomes, ...optEgress], [optIncomes, optEgress]);

    const editForm = useForm({
        id: null,
        description: '',
        amount: '',
        dateTime: '',
        type: 0,
        categoryId: 0
    }, transactionUpdateSchema(allCategories))
    
    const handleDeleteBtn = useCallback(async (id) => {
        await dispatch(deleteTransaction(id));
        setOpenMenuIndex(null)
        dispatch(refreshDashboardData())
        dispatch(getBudgets())
        toast.success({
            text: `Transacción Eliminada`,
            description: `id: ${id}`
        })
    }, [dispatch])
    
    const handleEditBtn = useCallback((data) => {
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
    }, [editForm])

    const handleSubmitEdit = useCallback(async (e) => {
        e.preventDefault()
        if(!editForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        const { id, ...data } = editForm.valores;
        setOpenModalEdit(false)
        await dispatch(putTransaction({ id, data }))
        dispatch(refreshDashboardData())
        toast.success({
            text: `Transacción Editada`,
            description: `id: ${id}`
        })
    }, [dispatch, editForm])

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

    const options = useMemo(() => [
        { value: 0, name: "Ingresos" },
        { value: 1, name: "Egresos" }
    ], [])

    const transactionsList = useMemo(() => {
        if (!transacciones || transacciones.length === 0) return [];
        return transacciones.slice(0, transactionsToRender || 10000000);
    }, [transacciones, transactionsToRender])

    return (
    <div className='TransactionsCardContainer'>
        <div className='TransactionsCard' ref={menuRef}>
            <div className="CardTitle">
            {
                transactionsToRender <= 20 ? 
                <>
                    <h3>Últimas Transacciones</h3>
                    <p>Revisa tus últimas transacciones registradas</p>
                </>
                :
                <>
                    <h3>Transacciones</h3>
                    <p>Revisa todas tus transacciones registradas</p>
                </>
            }
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
                    ) : transactionsList.length > 0 ? (
                        transactionsList.map((d, index) => {
                            return <tr key={index}>
                                <td>{d.description}</td>
                                <td>{d.type == 1 ? "Egreso" : "Ingreso" }</td>
                                <td>{catDictionary[d.categoryId]}</td>
                                <td>{d.dateTime.split('T')[0].replaceAll("-", "/")}</td>
                                <td className={`amount ${d.type === 0 ? 'income' : 'expense'}`}>${d.amount.toLocaleString("es-ES")}</td>
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
})

export default TransactionsCard