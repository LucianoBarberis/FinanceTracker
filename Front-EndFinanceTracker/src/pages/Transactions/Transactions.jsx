import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import './Transactions.css';
import TransactionsCard from '../../features/transactions/components/TransactionsCard/TransactionsCard';
import Header from '../../components/layout/Header/Header';
import { useTheme } from '../../features/theme/hooks/useTheme';
import { selectIsAuthenticated } from '../../features/loginRegister/redux/validationReducer';
import { selectTransactions } from '../../features/transactions/redux/transactionReducer';
import { selectCatIncomes, selectCatEgress } from '../../features/categories/redux/categoriesReducer';
import InfoCards from '../../features/analytics/components/InfoCards/InfoCards';
import { lastYear } from '../../features/analytics/redux/balanceReducer';

const Transactions = () => {
    useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuthenticated);
    const transacciones = useSelector(selectTransactions);
    const catIncomes = useSelector(selectCatIncomes);
    const catEgress = useSelector(selectCatEgress);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
            return;
        }
        dispatch(lastYear())
    }, [isAuth, dispatch, navigate]);

    const filteredTransactions = useMemo(() => {
        return transacciones.filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === 'all' || 
                                (typeFilter === 'income' && t.type === 0) || 
                                (typeFilter === 'expense' && t.type === 1);
            const matchesCategory = categoryFilter === 'all' || t.categoryId === parseInt(categoryFilter);
            const matchesDate = !dateFilter || t.dateTime.startsWith(dateFilter);

            return matchesSearch && matchesType && matchesCategory && matchesDate;
        });
    }, [transacciones, searchTerm, typeFilter, categoryFilter, dateFilter]);

    const categoriesOptions = useMemo(() => {
        if (typeFilter === 'income') return catIncomes;
        if (typeFilter === 'expense') return catEgress;
        return [...catIncomes, ...catEgress];
    }, [catIncomes, catEgress, typeFilter]);

    return (
        <>
            <Header />
            <div className="transactions-page">
                <div className="transactions-header">
                    <h1>Transacciones</h1>
                </div>

                <section className="transactions-summary">
                    <InfoCards/>
                </section>

                <section className="transactions-filters">
                    <div className="search-box">
                        <input 
                            className="inputBase"
                            type="text" 
                            placeholder="Busca por nombre..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <select 
                            className="inputSelect" 
                            value={typeFilter} 
                            onChange={(e) => {
                                setTypeFilter(e.target.value);
                                setCategoryFilter('all');
                            }}
                        >
                            <option value="all">Todos los tipos</option>
                            <option value="income">Ingresos</option>
                            <option value="expense">Egresos</option>
                        </select>
                        <select 
                            className="inputSelect" 
                            value={categoryFilter} 
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">Todas las categorias</option>
                            {categoriesOptions.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <input 
                            type="date" 
                            className="inputBase" 
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                </section>

                <section className="transactions-content">
                    <div className="transactions-list-container">
                        <TransactionsCard data={filteredTransactions} />
                    </div>
                </section>
            </div>
        </>
    );
};

export default Transactions;
