import CurrencyInput from "./components/CurrencyInput";
import {useState, useEffect} from "react";
import axios from "axios";
import Appcss from './App.css'


function App() {
  const [currency1, setCurrency1] = useState('USD')
  const [currency2, setCurrency2] = useState('RUB')
  const [amount1, setAmount1] = useState(1)
  const [amount2, setAmount2] = useState(1)
  const [rates,setRates] = useState([])


    useEffect(()=>{
      axios.get('https://api.fastforex.io/fetch-all?api_key=a28ed20922-8a490f914c-rl6ka1')
          .then(response => {
            setRates(response.data.results)
          })
    },[])

  useEffect(()=>{
    if(!!rates){
      handleAmount1Change(1)
    }
  },[rates])

  function format(number){
    return number.toFixed(4)
  }

    function handleAmount1Change(amount1) {
      setAmount2(format(amount1 * rates[currency2] / rates[currency1]))
      setAmount1(amount1)
    }

    function handleCurrency1Change(currency1){
      setAmount2(format(amount1 * rates[currency2] / rates[currency1]))
      setCurrency1(currency1)
    }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]))
    setAmount2(amount2)
  }

  function handleCurrency2Change(currency2){
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]))
    setCurrency2(currency2)
  }
  return (
    <div className="App">
      <h1>Currency Convertator</h1>
      <CurrencyInput currencies={Object.keys(rates)} onAmountChange={handleAmount1Change} onCurrencyChange={handleCurrency1Change} amount={amount1} currency={currency1}/>
      <CurrencyInput currencies={Object.keys(rates)} onAmountChange={handleAmount2Change} onCurrencyChange={handleCurrency2Change} amount={amount2} currency={currency2}/>
    </div>
  );
}

export default App;
