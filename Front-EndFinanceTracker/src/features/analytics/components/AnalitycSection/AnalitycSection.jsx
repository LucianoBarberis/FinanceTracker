import React from 'react'
import GastosByCategory from '../../../categories/components/GastosByCategory/GastosByCategory'
import TransactionsCard from '../../../transactions/components/TransactionsCard/TransactionsCard'
import './AnalitycSection.css'

const AnalitycSection = () => {
    return (
        <section className='AnalitycSection'>
            <GastosByCategory />
            <TransactionsCard />
        </section>
    )
}

export default AnalitycSection
