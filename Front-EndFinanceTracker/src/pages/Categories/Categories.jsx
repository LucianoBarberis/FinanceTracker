import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { LuTriangleAlert } from "react-icons/lu";
import Header from '../../components/layout/Header/Header';
import CategoryCard from '../../features/categories/components/CategoryCard/CategoryCard';
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
import { getTransactions } from '../../features/transactions/redux/getTransactionAction';

import './Categories.css';
import { toast } from '@pheralb/toast';

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    useTheme()
    
    const { catIncomes, catEgress, loading: catLoading } = useSelector(state => state.categories);
    const { transacciones, loading: transLoading } = useSelector(state => state.transaction);

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

        if (catIncomes.length === 0 && catEgress.length === 0) {
            dispatch(getCategories());
        }
        if (transacciones.length === 0) {
            dispatch(getTransactions());
        }
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

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        categoryForm.setValues({
            name: category.name,
            icon: category.icon || '',
            color: category.color || '#4a90e2',
            type: category.type
        });
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (category) => {
        setSelectedCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleUpdate = async (e) => {
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
    };

    const handleDelete = async () => {
        const result = await dispatch(deleteCategories(selectedCategory.id));
        if (!result.error) {
            setIsDeleteModalOpen(false);
        }
    };

    if (catLoading || transLoading) return(
        <div className='loadingContainer'>
            <Loading />
        </div>
    );

    return (
        <>
            <Header />
            <main className="categories-page">
                <div className="categories-header">
                    <h1>Mis Categorías</h1>
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
        </>
    );
};

export default Categories;

