import './Skeleton.css'

const Skeleton = ({ variant = 'text', count = 1, className = '' }) => {
    const variants = {
        text: 'skeleton--text',
        title: 'skeleton--title',
        card: 'skeleton--card',
        avatar: 'skeleton--avatar',
        button: 'skeleton--button'
    };

    return (
        <div className={`skeleton-container ${className}`}>
            {Array.from({ length: count }, (_, i) => (
                <div key={i} className={`skeleton ${variants[variant]}`} />
            ))}
        </div>
    )
}

export default Skeleton