import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LuTriangleAlert } from "react-icons/lu";
import Header from '../../components/layout/Header/Header';
import Footer from '../../components/layout/Footer/Footer';
import CategoryCard from '../../features/categories/components/CategoryCard/CategoryCard';
import Budget from '../../features/budget/components/Budget/Budget';
import Modal from '../../components/ui/Modal/Modal';
import FormInput from '../../components/ui/FormInput/FormInput';
import InputColorPicker from '../../components/ui/InputColorPicker/InputColorPicker';
import InputIconPicker from '../../components/ui/InputIconPicker/InputIconPicker';
import Loading from '../../components/ui/Loading/Loading';

import { useTheme } from '../../features/theme/hooks/useTheme';
import { useForm } from '../../hooks/useForm';
import { categorySchema } from '../../features/categories/validation/categorySchema';

import { getCategories } from '../../features/categories/redux/getCategoriesAction';
import { putCategories } from '../../features/categories/redux/putCategoriesAction';
import { deleteCategories } from '../../features/categories/redux/deleteCategoriesAction';
import { selectTransactions, selectTransactionsLoading } from '../../features/transactions/redux/transactionReducer';
import { selectCatIncomes, selectCatEgress, selectCategoriesLoading } from '../../features/categories/redux/categoriesReducer';
import { selectIsAuthenticated } from '../../features/loginRegister/redux/validationReducer';

import './Categories.css';
import { toast } from '@pheralb/toast';

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuthenticated);
    useTheme()
    
    const catIncomes = useSelector(selectCatIncomes);
    const catEgress = useSelector(selectCatEgress);
    const catLoading = useSelector(selectCategoriesLoading);
    const transacciones = useSelector(selectTransactions);
    const transLoading = useSelector(selectTransactionsLoading);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showIconPicker, setShowIconPicker] = useState(false);

    const categoryForm = useForm({
        name: '',
        icon: '',
        color: '#4a90e2',
        type: null
    }, categorySchema);

    useEffect(() => {
        if (!isAuth) {
            navigate("/");
            return;
        }

        dispatch(getCategories());
    }, [isAuth, dispatch, navigate]);

    const groupedData = useMemo(() => {
        const mapTransactions = (categories) => categories.map(cat => ({
            ...cat,
            transactions: transacciones.filter(t => t.categoryId === cat.id)
        }));

        return {
            incomes: mapTransactions(catIncomes),
            expenses: mapTransactions(catEgress)
        };
    }, [catIncomes, catEgress, transacciones]);

    const handleEditClick = useCallback((category) => {
        setSelectedCategory(category);
        categoryForm.setValues({
            name: category.name,
            icon: category.icon || '',
            color: category.color || '#4a90e2',
            type: category.type
        });
        setIsEditModalOpen(true);
    }, [categoryForm]);

    const handleDeleteClick = useCallback((category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    }, []);

    const handleUpdate = useCallback(async (e) => {
        e.preventDefault();

        if (!categoryForm.validar()) 
            return(
            toast.error({
                text: "Error al validar los datos",
            }),
            console.log(categoryForm.errores)
        )

        const result = await dispatch(putCategories({
            ...selectedCategory,
            ...categoryForm.valores
        }));
        
        if (!result.error) {
            setIsEditModalOpen(false);
            toast.success({
                text: "Categoria editada correctamente!"
            })
        }
    }, [dispatch, selectedCategory, categoryForm]);

    const handleDelete = useCallback(async () => {
        const result = await dispatch(deleteCategories(selectedCategory.id));
        if (!result.error) {
            setIsDeleteModalOpen(false);
        }
    }, [dispatch, selectedCategory]);

    if (catLoading || transLoading) return(
        <div className='loadingContainer loadingContainer--page'>
            <Loading size="lg" />
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', flex: 1 }}>
            <Header />
            <main className="categories-page" style={{ flex: 1 }}>
                <div className="categories-header">
                    <h1>Mis Categorías</h1>
                </div>

                <div className="budget-section">
                    <h2 className="section-title">Mis Presupuestos</h2>
                    <Budget />
                </div>

                <div className="categories-grid">
                    {groupedData.incomes.length > 0 && (
                        <>
                            <h2 className="section-title">Ingresos</h2>
                            {groupedData.incomes.map(cat => (
                                <CategoryCard 
                                    key={cat.id} 
                                    category={cat} 
                                    transactions={cat.transactions}
                                    onEdit={handleEditClick}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </>
                    )}
                    {groupedData.expenses.length > 0 && (
                        <>
                            <h2 className="section-title">Gastos</h2>
                            {groupedData.expenses.map(cat => (
                                <CategoryCard 
                                    key={cat.id} 
                                    category={cat} 
                                    transactions={cat.transactions}
                                    onEdit={handleEditClick}
                                    onDelete={handleDeleteClick}
                                />
                            ))}
                        </>
                    )}

                </div>
            </main>
            <Footer />

            {/* Edit Modal */}
            <Modal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)}
                title="Editar Categoría"
                description={`Modificando la categoría: ${selectedCategory?.name}`}
            >
                <form className="FormIncome" onSubmit={handleUpdate}>
                    <FormInput 
                        name="Nombre"
                        value="name"
                        type={"text"}
                        placeholder="Nombre de la categoría"
                        useForm={categoryForm}
                    />
                    
                    <InputIconPicker 
                        form={categoryForm}
                        showIconPicker={showIconPicker}
                        setShowIconPicker={setShowIconPicker}
                    />

                    <InputColorPicker 
                        form={categoryForm}
                        showColorPicker={showColorPicker}
                        setShowColorPicker={setShowColorPicker}
                    />

                    <button type="submit" className="submitIncome">Guardar Cambios</button>
                </form>
            </Modal>

            <Modal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)}
                title="¿Eliminar categoría?"
            >
                <div className="delete-modal-content">
                    <LuTriangleAlert size={48} color="#ea5e5e"/>
                    <p>
                        Estás a punto de eliminar la categoría <strong>{selectedCategory?.name}</strong>. 
                        Esta acción es permanente y eliminará todas las transacciones asociadas.
                    </p>
                    <div className="modal-actions">
                        <button className="btn btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Sí, eliminar permanentemente</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Categories;

