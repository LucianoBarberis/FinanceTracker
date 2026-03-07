import React from 'react'
import { HexColorPicker } from 'react-colorful'

const InputColorPicker = ({form, showColorPicker, setShowColorPicker}) => {
    return (
        <div className='formField colorPickerContainer'>
            <span className='error' style={{ display: form.getFieldError("color") ? 'block' : 'none' }}>
                {form.getFieldError("color") || ''}
            </span>
            <span className='label' style={{ display: form.getFieldError("color") ? 'none' : 'block' }}>
                Color
            </span>
            <div className='colorInputWrapper'>
                <div 
                    className='colorPreview' 
                    style={{ backgroundColor: form.valores.color }}
                />
                <input 
                    type="text"
                    className='colorInput'
                    value={form.valores.color}
                    onChange={(e) => form.setFieldValue('color', e.target.value)}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    placeholder="#000000"
                />
            </div>
            {showColorPicker && (
                <div className='popover'>
                    <div className='cover' onClick={() => setShowColorPicker(false)}/>
                    <HexColorPicker 
                        color={form.valores.color} 
                        onChange={(color) => form.setFieldValue('color', color)} 
                    />
                </div>
            )}
        </div>
)
}

export default InputColorPicker
