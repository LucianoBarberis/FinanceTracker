import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getTransactions } from '../features/transactions/redux/getTransactionAction';
import { getCategories } from '../features/categories/redux/getCategoriesAction';
import { getBudgets } from '../features/budget/redux/getBudgetsAction';
import { refreshDashboardData } from '../features/analytics/redux/refreshDashboardData';

export const useDashboardData = () => {
    const dispatch = useDispatch();
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        dispatch(getTransactions());
        dispatch(refreshDashboardData());
        dispatch(getCategories());
        dispatch(getBudgets());
    }, [dispatch]);
};
