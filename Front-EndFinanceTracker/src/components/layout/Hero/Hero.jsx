import React from 'react'
import './Hero.css'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { thisMonth, lastMonth, thisYear, lastYear } from '../../../features/analytics/redux/balanceReducer'
import { getBalances, getEgress, getIncomes } from '../../../features/analytics/redux/getBalancesAction'

const Hero = () => {
    const dispatch = useDispatch()
    const activeFilter = useSelector(state => state.balance.activeFilter)
    const userData = Cookies.get("userName")

    const handleFilterChange = (filterAction) => {
        dispatch(filterAction())
        dispatch(getBalances())
        dispatch(getIncomes())
        dispatch(getEgress())
    }

    return (
        <section className='hero'>
            <h1>Hola, {userData}!</h1>
            <div className='ButtonsContainer'>
                <button 
                    onClick={() => handleFilterChange(thisMonth)} 
                    className={`btnLeft ${activeFilter === 'thisMonth' ? 'active' : ''}`}
                >
                    Este Mes
                </button>
                <button 
                    onClick={() => handleFilterChange(lastMonth)} 
                    className={activeFilter === 'lastMonth' ? 'active' : ''}
                >
                    Último Mes
                </button>
                <button 
                    onClick={() => handleFilterChange(thisYear)} 
                    className={activeFilter === 'thisYear' ? 'active' : ''}
                >
                    Este Año
                </button>
                <button 
                    onClick={() => handleFilterChange(lastYear)} 
                    className={`btnRight ${activeFilter === 'lastYear' ? 'active' : ''}`}
                    style={{minWidth: "auto"}}
                >
                    Todos Los Registros
                </button>
            </div>
        </section>
    )
}

export default Hero
