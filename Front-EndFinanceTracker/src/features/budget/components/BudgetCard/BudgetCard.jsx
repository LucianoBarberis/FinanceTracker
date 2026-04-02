import React from 'react'
import './BudgetCard.css'

const BudgetCard = ({budgetTitle, value, total}) => {
    return (
        <div className='budgetCard'>
            <p className='budgetTilte'>{budgetTitle}</p>
            <p className='cardTitle'>Progreso del presupuesto definido:</p>    
            <div className='progressBarData'>
                <progress max={total} value={value}></progress>
                <span>{`$${value}/$${total}`}</span>
            </div>
        </div>
    )
}

export default BudgetCard
