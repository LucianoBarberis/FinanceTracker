import React, { useEffect, useState } from 'react'
import InfoCard from '../../ui/InfoCard/InfoCard'
import './InfoCards.css'
import { useDispatch, useSelector } from 'react-redux'
import { getBalances, getEgress, getIncomes } from '../../../redux/actions/getBalancesAction'

const InfoCards = () => {
    const Balance = useSelector((s) => s.balance.balance)
    const Incomes = useSelector((s) => s.balance.incomes)
    const Egress  = useSelector((s) => s.balance.egress)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getBalances())
        dispatch(getIncomes())
        dispatch(getEgress())
    }, [])
    return (
        <section className='InfoCardsContainer'>
            <InfoCard title={"Balance"} data={Balance} />
            <InfoCard title={"Ingresos"} data={Incomes} />
            <InfoCard title={"Egresos"} data={Egress} />
        </section>
    )
}

export default InfoCards
