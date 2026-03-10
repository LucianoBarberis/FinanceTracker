import { useEffect, useState } from 'react'
import './ActionSection.css'
import ActionCard from '../../ui/ActionCard/ActionCard'
import Modal from '../../ui/Modal/Modal'
import ModalFormInput from '../../ui/ModalFormInput/ModalFormInput.jsx'
import ModalFormSelect from '../../ui/ModalFormSelect/ModalFormSelect'
import InputColorPicker from '../../ui/InputColorPicker/InputColorPicker.jsx'
import { useForm } from '../../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { postTransaction } from '../../../redux/actions/postTransactionAction'
import { postCategories } from '../../../redux/actions/postCategoriesAction.js'
import { getBalances, getEgress, getIncomes } from '../../../redux/actions/getBalancesAction'
import { getCategories } from '../../../redux/actions/getCategoriesAction'
import { toast } from '@pheralb/toast'
import { TfiStatsUp, TfiStatsDown } from "react-icons/tfi";
import { LuLayoutDashboard } from "react-icons/lu";
import { transactionSchema } from '../../../validation/transactionSchema'
import { categorySchema } from '../../../validation/categorySchema.js'
import { useTheme } from '../../../hooks/useTheme'

const ActionSection = () => {
    const { theme } = useTheme();
    const [isOpenAddIncome, setIsOpenIncome] = useState(false)
    const [isOpenAddEgress, setIsOpenEgress] = useState(false)
    const [isOpenNewCat, setOpenNewCat] = useState(false)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const [isDark, setIsDark] = useState(false)
    const optIncomes = useSelector((s) => s.categories.catIncomes)
    const optEgress = useSelector((s) => s.categories.catEgress)

    useEffect(() => {
        setIsDark(theme === 'dark')
    }, [theme])
    
    const colors = {
        income: {
            icon: isDark ? '#17B26A' : '#0B9055',
            bg: isDark ? '#042A1C' : '#DCFAE6'
        },
        egress: {
            icon: isDark ? '#F04438' : '#B42318',
            bg: isDark ? '#441010' : '#FEE4E2'
        },
        category: {
            icon: isDark ? '#5CA9FE' : '#155EEF',
            bg: isDark ? '#162555' : '#e7f1fa'
        }
    }

    const incomeForm = useForm({
        description: '',
        amount: '',
        dateTime: '',
        type: 0,
        categoryId: -1
    }, transactionSchema);

    const egressForm = useForm({
        description: '',
        amount: '',
        dateTime: '',
        type: 1,
        categoryId: -1
    }, transactionSchema);

    const addCategoryForm = useForm({
        name: "",
        icon: "",
        color: "#ffffff",
        type: -1
    }, categorySchema)

    const handlerSubmitNewCat = async (e) => {
        e.preventDefault()
        if(!addCategoryForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        await dispatch(postCategories(addCategoryForm.valores))
        dispatch(getCategories())
        addCategoryForm.resetForm()
        toast.success({
            text: "Categoria añadida!"
        })
        setOpenNewCat(false)
    }

    const dispatch = useDispatch()

    const handleSubmitIncome = async (e) => {
        e.preventDefault();
        if(!incomeForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        setIsOpenIncome(false)
        await dispatch(postTransaction(incomeForm.valores))
        dispatch(getBalances())
        dispatch(getIncomes())
        dispatch(getCategories())
        dispatch(getEgress())
        incomeForm.resetForm()
        toast.success({
            text: "Transacción creada correctamente!",
        })
    };

    const handleSubmitEgress = async (e) => {
        e.preventDefault();
        if(!egressForm.validar()) return toast.error({
            text: "Error al validar los datos",
        });
        setIsOpenEgress(false)
        await dispatch(postTransaction(egressForm.valores))
        dispatch(getBalances())
        dispatch(getIncomes())
        dispatch(getCategories())
        dispatch(getEgress())
        egressForm.resetForm()
        toast.success({
            text: "Transacción creada correctamente!",
        })
    };

    useEffect(() => {
        egressForm.resetForm()
        incomeForm.resetForm()
        addCategoryForm.resetForm()
    }, [isOpenAddEgress, isOpenAddIncome, isOpenNewCat])

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    return (
        <>
            <section className='ActionCardsContainer'>
                <ActionCard 
                    onClick={() => setIsOpenIncome(true)} 
                    imgSrc={<TfiStatsUp color={colors.income.icon}/>} 
                    title={"Añadir un Ingreso"} 
                    description={"Crea un ingreso manualmente"} 
                    bgColor={colors.income.bg} 
                />
                <ActionCard 
                    onClick={() => setIsOpenEgress(true)} 
                    imgSrc={<TfiStatsDown color={colors.egress.icon}/>} 
                    title={"Añadir un Egreso"} 
                    description={"Crea un egreso manualmente"} 
                    bgColor={colors.egress.bg} 
                />
                <ActionCard 
                    onClick={() => setOpenNewCat(true)} 
                    imgSrc={<LuLayoutDashboard color={colors.category.icon}/>} 
                    title={"Añadir nueva categoria"} 
                    description={"Crea una nueva categoria"} 
                    bgColor={colors.category.bg} 
                />
            </section>

            {/* Modal Añadir Ingresos */}
            <Modal
                title="Añadir Ingreso"
                description="Esta acción va a aumentar el capital de tu billetera"
                isOpen={isOpenAddIncome}
                onClose={() => setIsOpenIncome(false)}
            >
                <form onSubmit={handleSubmitIncome} className='FormIncome' autoComplete='off'>
                    <div className='formGroup'>
                        <ModalFormInput name={"Monto"} type={"number"} value={"amount"} useForm={incomeForm} placeholder={"$"}/>
                        <ModalFormInput name={"Fecha"} type={"date"} value={"dateTime"} useForm={incomeForm} placeholder={""}/>
                    </div>
                    <ModalFormSelect useForm={incomeForm} name={"categoryId"} label={"Categoría"} options={optIncomes}/>
                    <ModalFormInput name={"Descripción"} type={"text"} value={"description"} useForm={incomeForm} placeholder={"Sueldo..."}/>
                    <button className='submitIncome' type="submit">Añadir</button>
                </form>
            </Modal>

            {/* Modal Añadir Egresos*/}
            <Modal
                title="Añadir Egreso"
                description="Esta acción va a disminuir el capital de tu billetera"
                isOpen={isOpenAddEgress}
                onClose={() => setIsOpenEgress(false)}
            >
                <form onSubmit={handleSubmitEgress} className='FormIncome' autoComplete='off'>
                    <div className='formGroup'>
                        <ModalFormInput name={"Monto"} type={"number"} value={"amount"} useForm={egressForm} placeholder={"$"}/>
                        <ModalFormInput name={"Fecha"} type={"date"} value={"dateTime"} useForm={egressForm} placeholder={""}/>
                    </div>
                    <ModalFormSelect useForm={egressForm} name={"categoryId"} label={"Categoría"} options={optEgress}/>
                    <ModalFormInput name={"Descripción"} type={"text"} value={"description"} useForm={egressForm} placeholder={"Sueldo..."}/>
                    <button className='submitEgress' type="submit">Añadir</button>
                </form>
            </Modal>

            {/* Modal New Category */}
            <Modal
                title="Añadir Categoría"
                description="Configura una nueva categoría para tus transacciones"
                isOpen={isOpenNewCat}
                onClose={() => {
                    setOpenNewCat(false)
                    setShowColorPicker(false)
                }}
            >
                <form onSubmit={handlerSubmitNewCat} className='FormIncome' autoComplete='off'>
                    <div className='formGroup'>
                        <ModalFormInput name={"Nombre"} type={"text"} value={"name"} useForm={addCategoryForm} placeholder={"Ventas..."}/>
                        <ModalFormInput name={"Icono"} type={"text"} value={"icon"} useForm={addCategoryForm} placeholder={"icono"}/>
                        
                    </div>
                    <ModalFormSelect useForm={addCategoryForm} name={"type"} label={"Tipo"} options={[{name: "Ingresos", value: 0}, {name: "Egresos", value:1}]}/>
                    <InputColorPicker form={addCategoryForm} showColorPicker={showColorPicker} setShowColorPicker={setShowColorPicker}/>
                    <button className='submitIncome' type="submit">Añadir</button>
                </form>
            </Modal>
        </>
    )
}

export default ActionSection