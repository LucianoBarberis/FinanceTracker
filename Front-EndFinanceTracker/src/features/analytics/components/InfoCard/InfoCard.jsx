import React from 'react'
import './InfoCard.css'

const InfoCard = React.memo(({ title, data }) => {
    return (
        <div className='infoCard'>
            <h3>{title}</h3>
            <div className='dataContainer'>
                <p className='data' aria-label={`${title}: ${data} pesos`}>${data}</p>
            </div>
        </div>
    )
})

export default InfoCard
