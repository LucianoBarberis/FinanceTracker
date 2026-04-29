import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LuTriangleAlert } from "react-icons/lu"
import { getBudgets } from '../../redux/getBudgetsAction'
import { deleteBudget } from '../../redux/deleteBudgetAction'
import BudgetCard from '../BudgetCard/BudgetCard'
import NewBudgetModal from '../NewBudgetModal/NewBudgetModal'
import EditBudgetModal from '../EditBudgetModal/EditBudgetModal'
import Modal from '../../../../components/ui/Modal/Modal'
import Loading from '../../../../components/ui/Loading/Loading'
import './Budget.css'
import { toast } from '@pheralb/toast'
import { selectCatDictionary, selectCategoriesLoading } from '../../../categories/redux/categoriesReducer'
import { selectBudgets, selectBudgetsLoading } from '../../redux/budgetReducer'


const Budget = React.memo(({budgetToRender}) => {
    const dispatch = useDispatch()
    const budgets = useSelector(selectBudgets)
    const catDictionary = useSelector(selectCatDictionary)
    const budgetsLoading = useSelector(selectBudgetsLoading)
    const categoriesLoading = useSelector(selectCategoriesLoading)
    
    const [isOpenNewBudget, setOpenNewBudget] = useState(false)
    const [isOpenEditBudget, setOpenEditBudget] = useState(false)
    const [isOpenDeleteBudget, setOpenDeleteBudget] = useState(false)
    const [selectedBudget, setSelectedBudget] = useState(null)

    useEffect(()=>{
        dispatch(getBudgets())
    }, [dispatch])

    const handleEdit = useCallback((budget) => {
        setSelectedBudget(budget)
        setOpenEditBudget(true)
    }, [])

    const handleDeleteClick = useCallback((budget) => {
        setSelectedBudget(budget)
        setOpenDeleteBudget(true)
    }, [])

    const handleDeleteConfirm = useCallback(async () => {
        const result = await dispatch(deleteBudget(selectedBudget.id))
        if (!result.error) {
            toast.success({
                text: "Presupuesto eliminado correctamente"
            })
            setOpenDeleteBudget(false)
        }
    }, [dispatch, selectedBudget])

    const budgetsToDisplay = useMemo(() => {
        return budgetToRender ? budgets.slice(0, budgetToRender) : budgets
    }, [budgets, budgetToRender])

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
                budgetsToDisplay.map((ele) => {
                    return (
                    <BudgetCard 
                        key={ele.categoryId + "BUD-KEY"} 
                        budgetTitle={catDictionary[ele.categoryId]}
                        value={ele.spentAmount}
                        total={ele.amount}
                        onEdit={() => handleEdit(ele)}
                        onDelete={() => handleDeleteClick(ele)}
                    />)
                })
            }
            <button onClick={() => setOpenNewBudget(true)} className='budgetCard addNewBudget'>
                <h3>+ Añadir nuevo límite</h3>
            </button>
            
            <NewBudgetModal 
                isOpen={isOpenNewBudget} 
                setOpen={setOpenNewBudget} 
                onClose={() => setOpenNewBudget(false)}
            />

            <EditBudgetModal 
                isOpen={isOpenEditBudget} 
                setOpen={setOpenEditBudget} 
                onClose={() => setOpenEditBudget(false)} 
                budget={selectedBudget}
                categoryName={selectedBudget ? catDictionary[selectedBudget.categoryId] : ''}
            />

            <Modal 
                isOpen={isOpenDeleteBudget} 
                onClose={() => setOpenDeleteBudget(false)}
                title="¿Eliminar presupuesto?"
            >
                <div className="delete-modal-content">
                    <LuTriangleAlert size={48} color="#ea5e5e"/>
                    <p>
                        Estás a punto de eliminar el presupuesto para la categoría <strong>{selectedBudget ? catDictionary[selectedBudget.categoryId] : ''}</strong>. 
                        Esta acción es permanente.
                    </p>
                    <div className="modal-actions">
                        <button className="btn btn-secondary" onClick={() => setOpenDeleteBudget(false)}>Cancelar</button>
                        <button className="btn btn-danger" onClick={handleDeleteConfirm}>Sí, eliminar</button>
                    </div>
                </div>
            </Modal>
        </section>
    )
})

export default Budget
