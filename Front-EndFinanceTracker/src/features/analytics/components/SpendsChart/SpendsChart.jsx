import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { IconRender } from '../../../../components/ui/IconRender/iconRender';
import './SpendingChart.css';
import { useSelector } from 'react-redux'
import { selectCatEgress } from '../../../categories/redux/categoriesReducer'

const SpendingChart = React.memo(() => {
    const rawData = useSelector(selectCatEgress)
    const data = useMemo(()=> {
        return [...rawData].sort((a, b)=> b.total - a.total)
    }, [rawData])
    const COLORS = useMemo(() => data.map(d => d.color), [data])
    const getContrastColor = (hexColor) => {
        if (!hexColor) return '#FFFFFF';
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#1f1a1a' : '#fdfdf4';
    };

    const total = useMemo(() => data.map((ele) => ele.total).reduce((acumulador, valorActual) => acumulador + valorActual, 0), [data])
    const isEmpty = total > 0 ? false : true
    if (isEmpty) {
        return(
            <>
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={[{ value: 1 }]}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={85}
                            fill='var(--wv-border)'
                            dataKey="value"
                            stroke='none'
                            strokeWidth={1}
                            isAnimationActive={false}
                        />
                    </PieChart>
                </ResponsiveContainer>
                <div className='Legend'>
                    <span>No hay gastos aún</span>
                    <p>Añadí un nuevo gasto para ver la distribución</p>
                </div>
            </>
        )
    }
    return (
        <div className='chart-container'>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={85}
                        dataKey="total"
                        stroke='var(--wv-border)'
                        strokeWidth={1}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className='Legend'>
                <ul>
                    {data.map((d) => {
                        return <li key={d.name}>
                                    <div style={{backgroundColor: d.color}} className='Icon'>
                                        <IconRender iconName={d.icon} color={getContrastColor(d.color)} />
                                    </div>
                                    <p>{d.name}</p>
                                    <span className='per'>{d.percentage.toFixed(2)}%</span>
                                </li>
                    })}
                </ul>
            </div>
        </div>
    );
})

export default SpendingChart;
