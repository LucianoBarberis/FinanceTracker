import React from 'react'
import InfoCard from '../../ui/InfoCard/InfoCard'
import './InfoCards.css'

const InfoCards = () => {
    return (
        <section className='InfoCardsContainer'>
            <InfoCard title={"Balance"} data={"10.000,00"} />
            <InfoCard title={"Ingresos"} data={"15.000,00"} />
            <InfoCard title={"Egresos"} data={"5.000,00"} />
        </section>
    )
}

export default InfoCards
