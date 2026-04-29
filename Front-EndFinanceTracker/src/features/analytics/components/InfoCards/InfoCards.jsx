import React, { useMemo } from 'react'
import InfoCard from '../InfoCard/InfoCard'
import './InfoCards.css'
import { useSelector } from 'react-redux'
import { selectBalanceSummary } from '../../redux/balanceReducer'

const InfoCards = React.memo(() => {
    const { balance, incomes, egress } = useSelector(selectBalanceSummary)

    const formattedBalance = useMemo(() => balance.toLocaleString("es-ES"), [balance])
    const formattedIncomes = useMemo(() => incomes.toLocaleString("es-ES"), [incomes])
    const formattedEgress = useMemo(() => egress.toLocaleString("es-ES"), [egress])

    return (
        <section className='InfoCardsContainer'>
            <InfoCard title={"Balance"} data={formattedBalance} />
            <InfoCard title={"Ingresos"} data={formattedIncomes} />
            <InfoCard title={"Egresos"} data={formattedEgress} />
        </section>
    )
})

export default InfoCards
