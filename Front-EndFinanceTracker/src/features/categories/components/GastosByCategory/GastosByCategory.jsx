import SpendingChart from '../../../analytics/components/SpendsChart/SpendsChart.jsx'
import './GastosByCategory.css'

const GastosByCategory = () => {
    return (
        <div className='ExpenseContainer'>
            <div className='CardTitle'>
                <h3>Gastos por categoria</h3>
                <p>Visualiza donde van mayormente tus gastos</p>
            </div>
            <div className='tableBorder'></div>
            <SpendingChart/>
        </div>
    )
}

export default GastosByCategory
