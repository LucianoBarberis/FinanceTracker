import React from 'react'
import GastosByCategory from '../../../categories/components/GastosByCategory/GastosByCategory'
import TransactionsCard from '../../../transactions/components/TransactionsCard/TransactionsCard'
import { useSelector } from 'react-redux'
import './AnalitycSection.css'

const AnalitycSection = () => {
    const { dateTime } = useSelector((state) => state.balance)
    const { transacciones: reduxTransactions } = useSelector((state) => state.transaction)
    const filterByDate = reduxTransactions.filter((e) => {
        return e.dateTime >= dateTime
    })
    return (
        <section className='AnalitycSection'>
            <GastosByCategory />
            <TransactionsCard data={filterByDate} transactionsToRender={20}/>
        </section>
    )
}

export default AnalitycSection
