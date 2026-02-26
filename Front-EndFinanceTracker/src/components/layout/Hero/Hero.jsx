import React from 'react'
import './Hero.css'

const Hero = () => {
    return (
        <section className='hero'>
            <h1>Hello, [user]!</h1>
            <div className='ButtonsContainer'>
                <button className='btnLeft active'>Este Mes</button>
                <button>Último Mes</button>
                <button>Este Año</button>
                <button className='btnRight'>Últimos 12 Meses</button>
            </div>
        </section>
    )
}

export default Hero
