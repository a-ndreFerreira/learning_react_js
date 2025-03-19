import './Button.css'

const Button = ({ text, onClick, disabled }) => {
    return (
        <button disabled={disabled} onClick={onClick} className='buttonClass'>
            {text}
        </button>
    )
}

export default Button