import './ActionCard.css'

const ActionCard = ({ description, title, imgSrc, bgColor, onClick }) => {
    return (
        <div className='ActionCard' onClick={onClick}>
            <div style={{backgroundColor: bgColor}} className='iconActionCard'>{imgSrc}</div>
            <div className='infoActionCard'>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ActionCard
