const ModalFormSelect = ({useForm, options, name}) => {
    return (
        <div className='formField'>
            <span className='error' style={{ display: useForm.getFieldError(name) ? 'block' : 'none' }}>
                {useForm.getFieldError(name) || ''}
            </span>
            <span className='label' style={{ display: useForm.getFieldError(name) ? 'none' : 'block' }}>
                Tipo
            </span>
            <select 
                name={name} 
                className='inputSelect' 
                value={useForm.valores.type} 
                onChange={useForm.handleChange}
            >
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
