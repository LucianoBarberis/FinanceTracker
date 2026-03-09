import React, { useEffect, useRef } from 'react'
import './Modal.css'

const Modal = ({ title, description, children, isOpen = false, onClose = () => {}, className = '' }) => {
    const overlayRef = useRef(null)
    const ANIMATION_DURATION = 100

    const [mounted, setMounted] = React.useState(isOpen)
    const [isAnimatingIn, setIsAnimatingIn] = React.useState(false)
    const [closing, setClosing] = React.useState(false)
    const prevBodyOverflow = useRef(null)

    useEffect(() => {
        if (isOpen) {
            setMounted(true)
            setClosing(false)
        } else if (mounted) {
            setClosing(true)
            const t = setTimeout(() => {
                setMounted(false)
                setClosing(false)
            }, ANIMATION_DURATION)
            return () => clearTimeout(t)
        }
        return () => {}
    }, [isOpen])

    useEffect(() => {
        if (mounted && !closing) {
            const animationFrame = requestAnimationFrame(() => {
                setIsAnimatingIn(true)
            })
            return () => cancelAnimationFrame(animationFrame)
        } else {
            setIsAnimatingIn(false)
        }
    }, [mounted, closing])

    useEffect(() => {
        if (mounted) {
            prevBodyOverflow.current = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            return () => {
                document.body.style.overflow = prevBodyOverflow.current || ''
            }
        }
        return () => {}
    }, [mounted])

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (mounted) {
            document.addEventListener('keydown', handleKey)
            return () => document.removeEventListener('keydown', handleKey)
        }
        return () => {}
    }, [mounted, onClose])

    if (!mounted) return null

    const childrenWithProps = React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { onClose }) : child
    )

    const overlayStateClass = closing ? 'closing' : (isAnimatingIn ? 'open' : '')
    const modalStateClass = closing ? 'closing' : (isAnimatingIn ? 'open' : '')

    return (
        <div
            className={`ft-modal-overlay ${overlayStateClass}`}
            ref={overlayRef}
            onMouseDown={(e) => {
                if (e.target === overlayRef.current) onClose()
            }}
            style={{ pointerEvents: closing ? 'none' : 'auto' }}
        >
            <div className={`ft-modal ${modalStateClass} ${className}`} role="dialog" aria-modal="true" aria-labelledby="ft-modal-title">
                <div className="ft-modal-header">
                    <div>
                        <h3 id="ft-modal-title">{title}</h3>
                        {description && <p className="ft-modal-desc">{description}</p>}
                    </div>
                    <button className="ft-modal-close" onClick={onClose} aria-label="Cerrar">×</button>
                </div>
                <div className="ft-modal-body">{childrenWithProps}</div>
            </div>
        </div>
    )
}

export default Modal
