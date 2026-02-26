import React, { useState } from 'react'
import Modal from '../components/ui/Modal/Modal'

const ModalExample = () => {
    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false)
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [formData, setFormData] = useState({ email: '', message: '' })

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
        setIsFormModalOpen(false)
        setFormData({ email: '', message: '' })
    }

    const handleConfirm = () => {
        console.log('Acción confirmada')
        setIsConfirmModalOpen(false)
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Ejemplos del Componente Modal</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
                Abre los modales para ver cómo funciona el componente en diferentes casos de uso.
            </p>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                
                {/* Ejemplo 1: Modal Básico */}
                <div style={cardStyle}>
                    <h3>1. Modal Básico</h3>
                    <p>Un modal simple con título y descripción</p>
                    <button onClick={() => setIsBasicModalOpen(true)} style={buttonStyle}>
                        Abrir Modal Básico
                    </button>
                </div>

                {/* Ejemplo 2: Modal con Formulario */}
                <div style={cardStyle}>
                    <h3>2. Modal con Formulario</h3>
                    <p>Un modal que contiene un formulario</p>
                    <button onClick={() => setIsFormModalOpen(true)} style={buttonStyle}>
                        Abrir Modal Formulario
                    </button>
                </div>

                {/* Ejemplo 3: Modal de Confirmación */}
                <div style={cardStyle}>
                    <h3>3. Modal de Confirmación</h3>
                    <p>Un modal para confirmar una acción</p>
                    <button onClick={() => setIsConfirmModalOpen(true)} style={buttonStyle}>
                        Abrir Modal Confirmación
                    </button>
                </div>
            </div>

            {/* MODAL 1: BÁSICO */}
            <Modal
                title="Modal Básico"
                description="Este es un ejemplo simple de un modal"
                isOpen={isBasicModalOpen}
                onClose={() => setIsBasicModalOpen(false)}
            >
                <div style={{ padding: '0.5rem 0' }}>
                    <p>
                        Este es el contenido dentro del modal. Puedes cerrar este modal de 3 formas:
                    </p>
                    <ul>
                        <li>Haciendo clic en el botón "×" (arriba a la derecha)</li>
                        <li>Haciendo clic fuera del modal (en el overlay gris)</li>
                        <li>Presionando la tecla "Escape"</li>
                    </ul>
                    <button 
                        onClick={() => setIsBasicModalOpen(false)}
                        style={{ ...buttonStyle, marginTop: '1rem' }}
                    >
                        Cerrar Modal
                    </button>
                </div>
            </Modal>

            {/* MODAL 2: FORMULARIO */}
            <Modal
                title="Enviar Mensaje"
                description="Completa el formulario y envía tu mensaje"
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
            >
                <form onSubmit={handleFormSubmit} style={{ padding: '1rem 0' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            placeholder="tu@email.com"
                            required
                            style={inputStyle}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                            Mensaje
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleFormChange}
                            placeholder="Escribe tu mensaje aquí..."
                            rows="4"
                            required
                            style={{ ...inputStyle, fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit" style={buttonStyle}>
                            Enviar
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsFormModalOpen(false)}
                            style={{ ...buttonStyle, background: '#e5e7eb', color: '#1f2937' }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>

            {/* MODAL 3: CONFIRMACIÓN */}
            <Modal
                title="Confirmar Acción"
                description="¿Estás seguro de que deseas continuar?"
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
            >
                <div style={{ padding: '1rem 0' }}>
                    <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                        Esta acción es irreversible. Por favor, confirma que deseas proceder.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={handleConfirm}
                            style={{ ...buttonStyle, background: '#ef4444', color: '#fff' }}
                        >
                            Sí, Confirmar
                        </button>
                        <button
                            onClick={() => setIsConfirmModalOpen(false)}
                            style={{ ...buttonStyle, background: '#e5e7eb', color: '#1f2937' }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

// Estilos simples
const cardStyle = {
    padding: '1.5rem',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    background: '#f9fafb'
}

const buttonStyle = {
    padding: '0.75rem 1.5rem',
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s ease'
}

const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box'
}

export default ModalExample
