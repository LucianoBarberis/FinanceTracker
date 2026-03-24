import React from 'react';
import { IconRender } from '../../../../components/ui/IconRender/iconRender';
import { LuPencil, LuTrash2 } from "react-icons/lu";
import './CategoryCard.css';

const getContrastColor = (hexColor) => {
    if (!hexColor) return '#FFFFFF';
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1f1a1a' : '#fdfdf4';
};

const CategoryCard = ({ category, transactions, onEdit, onDelete }) => {
    return (
        <div className="category-card">
            <div className="category-card-header">
                <div className="category-info">
                    {category.icon && (
                        <div className="category-icon" style={{ backgroundColor: `${category.color}`, color: category.color }}>
                            <IconRender iconName={category.icon} color={getContrastColor(category.color)}/>
                        </div>
                    )}
                    <h3>{category.name}</h3>
                </div>
                <div className="category-actions">
                    <button className="btn-icon edit" onClick={() => onEdit(category)} title="Editar">
                        <LuPencil />
                    </button>
                    <button className="btn-icon delete" onClick={() => onDelete(category)} title="Eliminar">
                        <LuTrash2 />
                    </button>
                </div>
            </div>
            <div className="tableBorder"></div>
            <div className="category-card-body">
                <h4>Transacciones ({transactions.length})</h4>
                <div className="mini-transaction-list">
                    {transactions.length > 0 ? (
                        transactions.slice(0, 5).map(t => (
                            <div key={t.id} className="mini-transaction-item">
                                <span className="description" title={t.description}>{t.description}</span>
                                <span className={`amount ${category.type === 0 ? 'income' : 'expense'}`}>
                                    {category.type === 0 ? '+' : '-'}${t.amount.toLocaleString("es-ES")}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="no-transactions">Sin transacciones</p>
                    )}
                    {transactions.length > 5 && (
                        <p className="more-transactions">...{transactions.length - 5} más</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;

