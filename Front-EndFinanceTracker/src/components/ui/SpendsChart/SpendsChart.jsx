import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './SpendingChart.css';

const data = [
    { name: 'Casa', value: 41.35, per: 41.35, color: '#9E77ED' },
    { name: 'Targeta de Credito', value: 21.51, per: 21.51, color: '#F04438' },
    { name: 'Transporte', value: 13.47, per: 13.47, color: '#0BA5EC'},
    { name: 'Ocio', value: 9.97, per: 9.97, color: '#17B26A' },
    { name: 'Shopping', value: 3.35, per: 3.35, color: '#4E5BA6' },
    { name: 'Otros', value: 2.55, per: 2.55, color: '#ECEFF2' },
];

const COLORS = data.map(d => {return d.color});

const SpendingChart = () => {
    return (
        <div className='chart-container'>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={100}
                        dataKey="value"
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
                        return <li key={d.name}><div style={{backgroundColor: d.color}} className='Icon'></div><p>{d.name}</p> <span className='per'>%{d.per}</span></li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SpendingChart;