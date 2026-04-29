import React, { useCallback } from 'react'
import './Hero.css'
import { useDispatch, useSelector } from 'react-redux'
import { thisMonth, lastMonth, thisYear, lastYear, selectBalanceActiveFilter } from '../../../features/analytics/redux/balanceReducer'
import { refreshDashboardData } from '../../../features/analytics/redux/refreshDashboardData'
import { selectAuthUser } from '../../../features/loginRegister/redux/validationReducer'

const Hero = () => {
    const dispatch = useDispatch()
    const activeFilter = useSelector(selectBalanceActiveFilter)
    const userData = useSelector(selectAuthUser)

    const handleFilterChange = useCallback((filterAction) => {
        dispatch(filterAction())
        dispatch(refreshDashboardData())
    }, [dispatch])

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
