import React from 'react'

const Tooltip = ({children}) => {
    return (
    <div ref={actionMenuRef}>
        <div className='ActionMenu'>
            <button onClick={()=>handleEditBtn(d)} className='ActionMenuButton edit'>
                Editar
            </button>
            <button onClick={()=> handleDeleteBtn(d.id)} className='ActionMenuButton delete'>
                Eliminar
            </button>
            {children}
        </div>
    </div>
    )
}

export default Tooltip
