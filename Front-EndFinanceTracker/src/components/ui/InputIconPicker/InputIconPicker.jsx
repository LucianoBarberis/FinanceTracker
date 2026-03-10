import { IconRender } from "../IconRender/iconRender"
import './InputIconPicker.css'
import { useEffect, useState } from "react";
import { useTheme } from "../../../features/theme/hooks/useTheme";

const iconNames = [
    "wallet",
    "chart-line",
    "hamburger",
    "car",
    "gamepad",
    "shopping-cart",
    "hospital",
    "education",
    "gift",
    "home",
    "airplane",
    "electricity",
    "water",
    "internet",
    "gym"
];


const InputIconPicker = ({form, showIconPicker, setShowIconPicker}) => {
    const [isDark, setIsDark] = useState(false)
    const { theme } = useTheme();
    useEffect(() => {
        setIsDark(theme === 'dark')
    }, [theme])
    return (
        <div className='formField colorPickerContainer'>
            <span className='error' style={{ display: form.getFieldError("icon") ? 'block' : 'none' }}>
                {form.getFieldError("icon") || ''}
            </span>
            <span className='label' style={{ display: form.getFieldError("icon") ? 'none' : 'block' }}>
                Icono
            </span>
            <div className='iconInputWrapper'>
                <div className='iconPreview'>
                    <IconRender iconName={form.valores.icon} color={isDark ? "#F9FAFB" : "#101828"} />
                </div>
                <input 
                    type="text"
                    className='iconInput'
                    value={form.valores.icon}
                    onChange={(e) => form.setFieldValue('icon', e.target.value)}
                    onClick={() => setShowIconPicker(!showIconPicker)}
                />
            </div>
            {showIconPicker && (
                <div className='popover iconsPopover'>
                    <div className='cover ' onClick={() => setShowIconPicker(false)}/>
                    {iconNames.map((e) => {
                        return(
                        <div onClick={() => {form.setFieldValue("icon", e); setShowIconPicker(false)}} key={e + "ICON-Key"}>
                            {<IconRender iconName={e}/>}
                        </div>)
                    })}
                </div>
            )}
        </div>
    )
}

export default InputIconPicker
