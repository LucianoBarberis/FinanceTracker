const ModalFormSelect = ({useForm, options, name, label}) => {
    return (
        <div className='formField'>
            <span className='error' style={{ display: useForm.getFieldError(name) ? 'block' : 'none' }}>
                {useForm.getFieldError(name) || ''}
            </span>
            <span className='label' style={{ display: useForm.getFieldError(name) ? 'none' : 'block' }}>
                {label || 'Seleccionar'}
            </span>
            <select 
                name={name} 
                className='inputSelect' 
                value={useForm.valores[name]} 
                onChange={useForm.handleChange}
            >
                <option value="-1" disabled>Seleccione una opción</option>
                {
                    options.map((e)=>{
                        return <option key={e.value} value={e.value}>{e.name}</option>
                    })
                }
            </select>
        </div>
    )
}

export default ModalFormSelect
