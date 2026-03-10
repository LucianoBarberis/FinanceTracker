import React, {useState} from 'react'
import { Link } from 'react-router'
import { VscGear, VscBell, VscAccount, VscMenu, VscClose } from "react-icons/vsc";
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import './Header.css'

const Header = () => {
    const [isOpenConfig, setOpenConfig] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <header>
            <div className='logo'>
                <h1>Fin<span>Track</span></h1>
            </div>
            <nav className={`menu ${isMobileMenuOpen ? 'mobileOpen' : ''}`}>
                <ul>
                    <li>
                        <Link className='active' to={"/"} onClick={() => setIsMobileMenuOpen(false)}>Overview</Link>
                    </li>
                    <li>
                        <Link to={"/"} onClick={() => setIsMobileMenuOpen(false)}>Transactions</Link>
                    </li>
                    <li>
                        <Link to={"/"} onClick={() => setIsMobileMenuOpen(false)}>Analytics</Link>
                    </li>
                    <li>
                        <Link to={"/"} onClick={() => setIsMobileMenuOpen(false)}>Accounts</Link>
                    </li>
                    <li>
                        <Link to={"/"} onClick={() => setIsMobileMenuOpen(false)}>Wallet</Link>
                    </li>
                </ul>
            </nav>
            <div className='accountMenu'>
                {isOpenConfig ? 
                    <div className={"ActionMenu config"}>
                        <h4 className='titleMenu'>Opciones</h4>
                        <div className='configOption'>
                            <p>Tema:</p>
                            <ThemeToggle />
                        </div>
                    </div>
                : null}
                <button className='menuHeaderBtn mobileOnly' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <VscClose /> : <VscMenu />}
                </button>
                <button className='menuHeaderBtn' onClick={()=> setOpenConfig(isOpenConfig === false ? true : false)}><VscGear /></button>
                <button className='menuHeaderBtn'><VscBell /></button>
                <button className='menuHeaderBtn'><VscAccount /></button>
            </div>
        </header>
    )
}

export default Header
