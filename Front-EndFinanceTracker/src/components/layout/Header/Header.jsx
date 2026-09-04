import React, {useState, useCallback, useEffect} from 'react'
import { Link, useLocation } from 'react-router'
import { VscGear, VscBell, VscAccount, VscMenu, VscClose } from "react-icons/vsc";
import ThemeToggle from '../../../features/theme/components/ThemeToggle/ThemeToggle';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuthenticated } from "../../../features/loginRegister/redux/validationReducer"
import { toast } from '@pheralb/toast';
import { useNavigate } from 'react-router';

const Header = React.memo(() => {
    const [isOpenConfig, setOpenConfig] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation().pathname
    const isAuth = useSelector(selectIsAuthenticated)
    
    const handlerLogout = useCallback(() => {
        toast.info({
            text:"Cerrando sesión..."
        })
        dispatch(logout())
    }, [dispatch])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        const onKey = (e) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', onKey)
        }
    }, [isMobileMenuOpen])

    const closeDrawer = useCallback(() => setIsMobileMenuOpen(false), [])

    if (!isAuth) {
        return (
            <>
                <header className={isMobileMenuOpen ? 'drawerOpen' : ''}>
                    <div className='logo' onClick={()=> navigate('/')} >
                        <div className='logo-text'>Fin<span>Track</span></div>
                    </div>
                    <nav className={`menu menu--landing ${isMobileMenuOpen ? 'mobileOpen' : ''}`} aria-label="Navegación principal">
                        <div className='drawerHeader'>
                            <div className='drawerLogo'>Fin<span>Track</span></div>
                            <button className='drawerClose' onClick={closeDrawer} aria-label="Cerrar menú">
                                <VscClose />
                            </button>
                        </div>
                        <ul>
                            <li><a href="/#features" onClick={closeDrawer}>Home</a></li>
                            <li><Link to="/legal/datos" onClick={closeDrawer}>Privacidad</Link></li>
                            <li><a href="https://github.com/LucianoBarberis/FinanceTracker" target="_blank" rel="noreferrer" onClick={closeDrawer}>GitHub</a></li>
                        </ul>
                        <div className='drawerFooter drawerFooter--landing'>
                            <Link to="/login" onClick={closeDrawer} className='headerAuthBtn headerAuthBtn--ghost' style={{width:'100%'}}>Ingresar</Link>
                            <Link to="/register" onClick={closeDrawer} className='headerAuthBtn headerAuthBtn--primary' style={{width:'100%'}}>Crear cuenta</Link>
                            <div className='configOption' style={{width:'100%', marginTop:8, display:'flex', alignItems:'center', gap: 10}}>
                                Tema: <ThemeToggle />
                            </div>
                        </div>
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
                        <Link to="/login" className='headerAuthBtn headerAuthBtn--ghost hideMobile'>Ingresar</Link>
                        <Link to="/register" className='headerAuthBtn headerAuthBtn--primary hideMobile'>Crear cuenta</Link>
                        <button className='menuHeaderBtn' onClick={()=> setOpenConfig(isOpenConfig === false ? true : false)}><VscGear /></button>
                        <button className='menuHeaderBtn mobileOnly' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMobileMenuOpen}>
                            {isMobileMenuOpen ? <VscClose /> : <VscMenu />}
                        </button>
                    </div>
                </header>
                <div className={`drawerOverlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={closeDrawer} aria-hidden="true" />
            </>
        )
    }

    return (
        <>
            <header className={isMobileMenuOpen ? 'drawerOpen' : ''}>
                <div className='logo' onClick={()=> navigate('/')} >
                    <div className='logo-text'>Fin<span>Track</span></div>
                </div>
                <nav className={`menu ${isMobileMenuOpen ? 'mobileOpen' : ''}`} aria-label="Navegación principal" aria-hidden={!isMobileMenuOpen && typeof window !== 'undefined' && window.innerWidth <= 1024 ? undefined : undefined}>
                    <div className='drawerHeader'>
                        <div className='drawerLogo'>Fin<span>Track</span></div>
                        <button className='drawerClose' onClick={closeDrawer} aria-label="Cerrar menú">
                            <VscClose />
                        </button>
                    </div>
                    <ul>
                        <li>
                            <Link
                                className={location == "/" ? "active": ""}
                                to={"/"}
                                onClick={closeDrawer}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/transactions"}
                                onClick={closeDrawer}
                                className={location == "/transactions" ? "active": ""}
                            >
                                Transacciones
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/categories"}
                                onClick={closeDrawer}
                                className={location == "/categories" ? "active": ""}
                            >
                                Categorías
                            </Link>
                        </li>
                    </ul>
                    <div className='drawerFooter'>
                        <button onClick={() => { closeDrawer(); handlerLogout(); }} className='drawerLogout'>Cerrar sesión</button>
                        <p className='drawerHint'>FinTrack · v1.0</p>
                    </div>
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
                    <button className='menuHeaderBtn mobileOnly' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMobileMenuOpen}>
                        {isMobileMenuOpen ? <VscClose /> : <VscMenu />}
                    </button>
                    <button className='menuHeaderBtn' onClick={()=> setOpenConfig(isOpenConfig === false ? true : false)}><VscGear /></button>
                    <button className='menuHeaderBtn'><VscBell /></button>
                    <button className='menuHeaderBtn'><VscAccount /></button>
                </div>
            </header>
            <div
                className={`drawerOverlay ${isMobileMenuOpen ? 'open' : ''}`}
                onClick={closeDrawer}
                aria-hidden="true"
            />
        </>
    )
})

export default Header
