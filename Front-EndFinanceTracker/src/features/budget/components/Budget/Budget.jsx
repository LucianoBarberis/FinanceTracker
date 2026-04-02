import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBudgets } from '../../redux/getBudgetsAction'
import BudgetCard from '../BudgetCard/BudgetCard'
import NewBudgetModal from '../NewBudgetModal/NewBudgetModal'
import Loading from '../../../../components/ui/Loading/Loading'
import './Budget.css'

const Budget = ({budgetToRender}) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getBudgets())
    }, [])
    const budgets = useSelector(state => state.budget.budgets)
    const catDictionary = useSelector(state => state.categories.catDictionary)
    const budgetsLoading = useSelector(state => state.budget.loading)
    const categoriesLoading = useSelector(state => state.categories.loading)
    const [isOpenNewBudget, setOpenNewBudget] = useState(false)

    if(budgetsLoading || categoriesLoading) {
        return (
                <div className='loadingContainer'>
                    <Loading />
                </div>
            )
    }
    return (
        <section className='BudgetCardContainer'>
            {
                budgets.slice(0, budgetToRender).reverse().map((ele) => {
                    return (
                    <BudgetCard 
                        key={ele.categoryId + "BUD-KEY"} 
                        budgetTitle={catDictionary[ele.categoryId]}
                        value={ele.spentAmount}
                        total={ele.amount}
                    />)
                })
            }
            <button onClick={() => setOpenNewBudget(true)} className='budgetCard addNewBudget'>
                <h3>+ Añadir nuevo límite</h3>
            </button>
            <NewBudgetModal isOpen={isOpenNewBudget} setOpen={setOpenNewBudget} onClose={() => setOpenNewBudget(false)}/>
        </section>
    )
}

export default Budget
