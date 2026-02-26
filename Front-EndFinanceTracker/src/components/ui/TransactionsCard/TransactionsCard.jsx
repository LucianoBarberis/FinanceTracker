import React, { useEffect } from 'react'
import { GrMoreVertical } from "react-icons/gr";
import './TransactionsCard.css'
import { getTransactions } from '../../../redux/actions/getTransactionAction';
import { useDispatch, useSelector } from 'react-redux';

const TransactionsCard = () => {

    const {transacciones, loading} = useSelector((state) => state.transaction)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTransactions())
    }, [dispatch])

    return (
        <div className='TransactionsCard'>
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
                                    <button className='TableActionBtn'>
                                        <GrMoreVertical />
                                    </button>
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
    )
}


export default TransactionsCard
