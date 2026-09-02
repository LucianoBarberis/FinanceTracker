import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../features/transactions/redux/getTransactionAction';
import { getCategories } from '../features/categories/redux/getCategoriesAction';
import { getBudgets } from '../features/budget/redux/getBudgetsAction';
import { refreshDashboardData } from '../features/analytics/redux/refreshDashboardData';
import { selectIsAuthenticated } from '../features/loginRegister/redux/validationReducer';

export const useDashboardData = (enabled = true) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuthenticated);
    const initialized = useRef(false);

    useEffect(() => {
        if (!enabled || !isAuth || initialized.current) return;
        initialized.current = true;

        dispatch(getTransactions());
        dispatch(refreshDashboardData());
        dispatch(getCategories());
        dispatch(getBudgets());
    }, [dispatch, isAuth, enabled]);
};
