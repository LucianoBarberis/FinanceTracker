import React from 'react'
import './Hero.css'
import Cookies from 'js-cookie'

const Hero = () => {
    const userData = Cookies.get("userName")
    return (
        <section className='hero'>
            <h1>Hola, {userData}!</h1>
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
