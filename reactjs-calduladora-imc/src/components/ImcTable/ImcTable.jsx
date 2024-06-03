
import Button from '../Button/Button'
import './ImcTable.css'

const ImcTable = ({ data, imc, info, infoClass, resetCalc }) => {
    return (
        <div id='resultContainer'>
            <p id='imcNumber'>
                Seu IMC: <span className={infoClass}>{imc}</span>
            </p>
            <p id='imcInfo'>
                Situação atual: <span className={infoClass}>{info}</span>
            </p>
            <h3>
                Confira as classificações:
            </h3>
            <div id="imcTable">
                <div className="tableHead">
                    <h4>
                        IMC
                    </h4>
                    <h4>
                        Classificação
                    </h4>
                    <h4>
                        Obasidade
                    </h4>
                </div>
                {
                    data.map((item) => (
                        <div className="tableData" key={item.info}>
                            <p>
                                {item.classification}
                            </p>
                            <p>
                                {item.info}
                            </p>
                            <p>
                                {item.obesity}
                            </p>
                        </div>
                    ))
                }
            </div>
            <Button id='backBtn' text='Voltar' action={resetCalc} />
        </div>
    )
}

export default ImcTable