import React from 'react'
import SpendingChart from '../SpendsChart/SpendsChart.jsx'
import './GastosByCategory.css'

const GastosByCategory = () => {
    return (
        <div className='ExpenseContainer'>
            <h3>Gastos por categoria</h3>
            <SpendingChart/>
        </div>
    )
}

export default GastosByCategory
