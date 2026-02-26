import React from 'react'
import GastosByCategory from '../../ui/GastosByCategory/GastosByCategory'
import TransactionsCard from '../../ui/TransactionsCard/TransactionsCard'
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
