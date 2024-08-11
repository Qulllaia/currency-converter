
const defaultCurrency = ['USD','RUB','EUR']
 
export const Block = ({currency,chooseCurrency,inputValue,value, currencies}) =>{
    var list_currencies = []
    for(var i in currencies){
        if(!defaultCurrency.includes(i))
            list_currencies.push(i)
    }

    return(
        <div className="Block">
            <ul className="currencies">
                {defaultCurrency.map((val)=>(
                    <li key={val} 
                    onClick={(event) => {
                        chooseCurrency(val)
                        event.target.parentNode.lastElementChild.firstElementChild.value = "default"
                        }
                    }    
                    className={
                        val === currency ? 'activate' : ''}
                    >{val}</li>
                ))}
                <li className={!defaultCurrency.includes(currency) ? 'activate' : ''}>
                    <select id="select"
                        onChange={(event) => {
                            chooseCurrency(event.target.value)
                        }}>
                            <option className="default-option" value ="default">
                                &#9660;
                            </option>
                            {list_currencies.map((val)=>(
                                <option key={val}>{val}</option>
                            ))}
                    </select>
                </li>
            </ul>
            <input 
                placeholder="0"
                value={value}
                type="number" 
                onChange={(e)=>{
                    inputValue(e.target.value)
                }} 
                ></input>
        </div>
    )
}