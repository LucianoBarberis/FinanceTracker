const ModalFormInput = ({name, value, useForm, type, placeholder}) => {
    return (
        <div className='formField'>
            <span className='error' style={{ display: useForm.getFieldError(value) ? 'block' : 'none' }}>
                {useForm.getFieldError(value) || ''}
            </span>
            <span className='label' style={{ display: useForm.getFieldError(value) ? 'none' : 'block' }}>
                {name}
            </span>
            <input
                onChange={useForm.handleChange}
                value={useForm.getFieldValue(value)}
                type={type}
                placeholder={placeholder}
                name={value}
                className={`inputBase ${useForm.getFieldError(value)?.length > 0 ? "errorInput" : ""}`}
            />
        </div>
    )
}

export default ModalFormInput
