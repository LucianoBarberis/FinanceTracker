import { useState, useEffect } from 'react';

/**
 * Custom hook para manejar formularios
 * @param {Object} valoresIniciales - Valores iniciales del formulario
 * @param {Object} ValidateSchema - Esquema para validar los datos ingresados en el form
 * @returns {Object} Un objeto con valores, handleChange, resetForm y otros métodos
 */
export const useForm = (valoresIniciales = {}, ValidateSchema) => {
    const [valores, setValores] = useState(valoresIniciales);
    const [errores, setErrores] = useState({});

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setValores((prevValores) => ({
            ...prevValores,
            [name]: newValue,
        }));
        
        validarCampo(name, newValue);
    };

    const validar = () => {
        if(ValidateSchema == null) {
            return true
        }
        try {
            ValidateSchema.parse(valores)
            setErrores({})
            return true
        } catch (error) {
            const erroresFormato = {};
            
            if (error.issues && Array.isArray(error.issues)) {
                error.issues.forEach((err) => {
                    const campo = err.path[0];
                    erroresFormato[campo] = err.message;
                });
            } else {
                console.error('Error inesperado al validar:', error);
            }
            
            setErrores(erroresFormato);
            return false
        }
    }

    const validarCampo = (fieldName, fieldValue) => {
    if(!ValidateSchema) return true;
    
    try {
        const fieldSchema = ValidateSchema.pick({ [fieldName]: true });
        fieldSchema.parse({ [fieldName]: fieldValue });
        
        setErrores((prevErrores) => ({
            ...prevErrores,
            [fieldName]: undefined,
        }));
        return true;
    } catch (error) {
        if (error.issues && Array.isArray(error.issues)) {
            const mensaje = error.issues[0]?.message;
            setErrores((prevErrores) => ({
                ...prevErrores,
                [fieldName]: mensaje,
            }));
        }
        return false;
    }
};

    // Resetear el formulario a los valores iniciales
    const resetForm = () => {
        setValores(valoresIniciales);
        setErrores({})
    };

    // Actualizar un valor específico
    const setFieldValue = (fieldName, fieldValue) => {
        setValores((prevValores) => ({
            ...prevValores,
            [fieldName]: fieldValue,
        }));
    };

    // Actualizar múltiples valores
    const setValues = (nuevosValores) => {
        setValores((prevValores) => ({
            ...prevValores,
            ...nuevosValores,
        }));
    };

    // Obtener un valor específico
    const getFieldValue = (fieldName) => {
        return valores[fieldName];
    };

    // Obtener error de un campo específico
    const getFieldError = (fieldName) => {
        return errores[fieldName];
    };

    return {
        valores,
        errores,
        handleChange,
        resetForm,
        setFieldValue,
        setValues,
        getFieldValue,
        getFieldError,
        validar,
    };
};
