import { Block } from "./components/Block";
import { useEffect, useState, useRef } from "react";
import './css/main.css'

function App() {
  const currencyAPI = 'https://v6.exchangerate-api.com/v6/ded1fc96e8d8f515710c2307/latest/USD'
  const [fromCurrency,chooseFromCurrency] = useState('USD')
  const [toCurrency,chooseToCurrency] = useState('RUB')
  const [fromCurrencyValue, inputFromValue] = useState(1)
  const [toCurrencyValue, inputToValue] = useState(0)

  const ratesRef = useRef({})

  useEffect(() => {
    fetch(currencyAPI).
    then((res)=>res.json()).
    then((json)=>{
      ratesRef.current = json.conversion_rates
      setFromValue(1)
    })
    .catch((e)=>{
      console.log(e)
    })
  }
  ,[])
  const setFromValue = (val) =>{
    const result = Number(val*ratesRef.current[toCurrency]/ratesRef.current[fromCurrency]).toFixed(2)
    inputToValue(result)
    inputFromValue(val)
  }

  const setToValue = (val) =>{
    const result = Number(val*ratesRef.current[fromCurrency]/ratesRef.current[toCurrency]).toFixed(2)
    inputFromValue(result)
    inputToValue(val)
  }

  useEffect(()=>{
    setFromValue(fromCurrencyValue)
  },[toCurrency,fromCurrency])

  return (
    <div className="App">
      <div className="block-panel">
        <Block 
        value={fromCurrencyValue}
        currency={fromCurrency} 
        inputValue={setFromValue} 
        chooseCurrency={chooseFromCurrency}
        currencies = {ratesRef.current}
        ></Block>
        <Block 
        value={toCurrencyValue}
        currency={toCurrency} 
        inputValue={setToValue} 
        chooseCurrency={chooseToCurrency} 
        currencies = {ratesRef.current}
        ></Block>
      </div>
    </div>
  );
}

export default App;
