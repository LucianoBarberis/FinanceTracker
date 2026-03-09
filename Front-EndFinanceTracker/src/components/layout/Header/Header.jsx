import React from 'react'
import { Link } from 'react-router'
import { VscGear, VscBell, VscAccount } from "react-icons/vsc";
import ThemeToggle from '../../ui/ThemeToggle/ThemeToggle';
import './Header.css'

const Header = () => {
    return (
        <header>
            <div className='logo'>
                <h1>Fin<span>Track</span></h1>
            </div>
            <nav className='menu'>
                <ul>
                    <li>
                        <Link className='active' to={"/"}>Overview</Link>
                    </li>
                    <li>
                        <Link to={"/"}>Transactions</Link>
                    </li>
                    <li>
                        <Link to={"/"}>Analytics</Link>
                    </li>
                    <li>
                        <Link to={"/"}>Accounts</Link>
                    </li>
                    <li>
                        <Link to={"/"}>Wallet</Link>
                    </li>
                </ul>
            </nav>
            <div className='accountMenu'>
                <ThemeToggle />
                <button><VscGear /></button>
                <button><VscBell /></button>
                <button><VscAccount /></button>
            </div>
        </header>
    )
}

export default Header
