
import { useState } from 'react'

import Button from '../Button/Button'

import './ImcCalc.css'

const ImcCalc = ({ calcImc }) => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const clearForm = (e) => {
        e.preventDefault();
        setHeight('');
        setWeight('');
    }

    const validDigits = (text) => {
        return text.replace(/[^0-9,]/g, '');
    }

    const handleHeightChange = (e) => {
        const updateValue = validDigits(e.target.value)
        setHeight(updateValue);
    }

    const handleWeightChange = (e) => {
        const updateValue = validDigits(e.target.value);
        setWeight(updateValue);
    }

    return (
        <div id='calcContainer'>
            <h2>
                Calculadora de IMC
            </h2>
            <form id='imcForm'>
                <div className='formInputs'>
                    <div className='formControl'>
                        <label htmlFor='height'>Altura:</label>
                        <input
                            type='text'
                            name='height'
                            id='height'
                            placeholder='Exemplo 1,70'
                            onChange={(e) => handleHeightChange(e)}
                            value={height}
                        />
                    </div>

                    <div className='formControl'>
                        <label htmlFor='weight'>Peso:</label>
                        <input
                            type='text'
                            name='weight'
                            id='weight'
                            placeholder='Exemplo 80,5'
                            onChange={(e) => handleWeightChange(e)}
                            value={weight}
                        />
                    </div>

                </div>

                <div className='actionControl'>
                    <Button id='calcBtn' text='Calcular' action={(e) => calcImc(e, height, weight)} />
                    <Button id='clearBtn' text='Limpa' action={clearForm} />
                </div>
            </form>
        </div>
    )
}

export default ImcCalc