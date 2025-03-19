import './Input.css'

const Input = ({ onChange, searchValue, placeholder }) => {
    return (
        <fieldset>
            <legend>Buscar</legend>
            <input type='search'
                onChange={onChange}
                value={searchValue}
                placeholder={placeholder}
            />
        </fieldset>
    )
}

export default Input