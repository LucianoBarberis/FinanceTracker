import React, {useState, useCallback} from 'react'
import { Link, useLocation } from 'react-router'
import { VscGear, VscBell, VscAccount, VscMenu, VscClose } from "react-icons/vsc";
import ThemeToggle from '../../../features/theme/components/ThemeToggle/ThemeToggle';
import './Header.css'
import { useDispatch } from 'react-redux';
import { logout } from "../../../features/loginRegister/redux/validationReducer"
import { toast } from '@pheralb/toast';
import { useNavigate } from 'react-router';

const Header = React.memo(() => {
    const [isOpenConfig, setOpenConfig] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation().pathname
    
    const handlerLogout = useCallback(() => {
        toast.info({
            text:"Cerrando sesión..."
        })
        dispatch(logout())
    }, [dispatch])
    return (
        <header>
            <div className='logo' onClick={()=> navigate('/')} >
                <div className='logo-text'>Fin<span>Track</span></div>
            </div>
            <nav className={`menu ${isMobileMenuOpen ? 'mobileOpen' : ''}`}>
                <ul>
                    <li>
                        <Link
                            className={location == "/" ? "active": ""}
                            to={"/"}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/transactions"}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={location == "/transactions" ? "active": ""}
                        >
                            Transacciones
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/categories"}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={location == "/categories" ? "active": ""}
                        >
                            Categorías
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/"}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={location == "/accounts" ? "active": ""}
                        >
                            Estadísticas
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/"}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={location == "/wallet" ? "active": ""}
                        >
                            Wallet
                        </Link>
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
                        <div className='configOption'>
                            <button onClick={() => handlerLogout()} className='logoutBtn'>Cerrar Sesión</button>
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
})

export default Header
