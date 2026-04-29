import React, { useMemo } from 'react'
import GastosByCategory from '../../../categories/components/GastosByCategory/GastosByCategory'
import TransactionsCard from '../../../transactions/components/TransactionsCard/TransactionsCard'
import { useSelector } from 'react-redux'
import { selectBalanceDateTime } from '../../redux/balanceReducer'
import { selectTransactions } from '../../../transactions/redux/transactionReducer'
import './AnalitycSection.css'

const AnalitycSection = React.memo(() => {
    const dateTime = useSelector(selectBalanceDateTime)
    const reduxTransactions = useSelector(selectTransactions)
    const filterByDate = useMemo(() => {
        return reduxTransactions.filter((e) => e.dateTime >= dateTime)
    }, [reduxTransactions, dateTime])
    return (
        <section className='AnalitycSection'>
            <GastosByCategory />
            <TransactionsCard data={filterByDate} transactionsToRender={20}/>
        </section>
    )
})

export default AnalitycSection
