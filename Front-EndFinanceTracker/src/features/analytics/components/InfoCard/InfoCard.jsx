import React from 'react'
import './infoCard.css'
import { VscArrowSmallUp } from "react-icons/vsc";

const InfoCard = ({ title, data }) => {
    return (
        <div className='infoCard'>
            <h3>{title}</h3>
            <div className='dataContainer'>
                <p className='data'>${data}</p>
                <p className='dataPer'>
                    10,5%
                </p>
            </div>
        </div>
    )
}

export default InfoCard
