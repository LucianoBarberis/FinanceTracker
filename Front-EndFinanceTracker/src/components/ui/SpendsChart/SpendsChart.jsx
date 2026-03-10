import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { IconRender } from '../IconRender/iconRender';
import './SpendingChart.css';
import { useSelector } from 'react-redux'

const SpendingChart = () => {
    const rawData = useSelector((s) => s.categories.catEgress)
    const data = useMemo(()=> {
        return [...rawData].sort((a, b)=> b.total - a.total)
    }, [rawData])
    const COLORS = data.map(d => {return d.color});

    const getContrastColor = (hexColor) => {
        if (!hexColor) return '#FFFFFF';
        const hex = hexColor.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#1f1a1a' : '#fdfdf4';
    };

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
                        stroke='#10182810'
                        strokeWidth={1}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontSize: '15px'}}
                    />
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
                                    <span className='per'>{d.percentaje.toFixed(2)}%</span>
                                </li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SpendingChart;