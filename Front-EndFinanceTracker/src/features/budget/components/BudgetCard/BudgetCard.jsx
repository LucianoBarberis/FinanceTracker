import React, { useState, useRef, useEffect } from 'react'
import './BudgetCard.css'
import { LuEllipsis } from 'react-icons/lu'

const BudgetCard = React.memo(({budgetTitle, value, total, onEdit, onDelete}) => {
    const actionMenuRef = useRef(null)
    const [isMenuOpen, setOpenMenu] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
                setOpenMenu(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className='budgetCard'>
            <div className='budgetCardHeader'>
                <p className='budgetTilte'>{budgetTitle}</p>
                <div ref={actionMenuRef}>
                    <LuEllipsis className='BudgetActionMenuBtn' onClick={() => setOpenMenu(!isMenuOpen)}>Open</LuEllipsis>
                {
                    isMenuOpen ? (
                        
                            <div className='ActionMenu budgetActionMenu'>
                                <button onClick={onEdit} className='ActionMenuButton edit'>
                                    Editar
                                </button>
                                <button onClick={onDelete} className='ActionMenuButton delete'>
                                    Eliminar
                                </button>
                            </div>
                    ): null
                }
                </div>
            </div>
            <p className='cardTitle'>Progreso del presupuesto definido:</p>    
            <div className='progressBarData'>
                <progress max={total} value={value}></progress>
                <span>{`$${value}/$${total}`}</span>
            </div>
        </div>
    )
})

export default BudgetCard
