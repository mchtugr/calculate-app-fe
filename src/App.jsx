import { useState } from 'react'
import './App.css'

const baseUrl = process.env.REACT_APP_BASE_URL || '/api';

function App() {
  const [ numbers, setNumbers ] = useState({
    first: '',
    second: ''
  })
  const [ result, setResult ] = useState(null);

  const onInputChange = (e) => {
    const { name, value } = e.target;

    if (!isNaN(value)) {

      setNumbers((prev) => ({
        ...prev,
        [ name ]: value
      }))
      return
    }
  }

  const onRecalculate = () => {
    setResult(null)
    setNumbers({
      first: '',
      second: ''
    })
  }

  const onAddNumbers = (e) => {
    e.preventDefault()

    const { first, second } = numbers

    fetch(baseUrl + '/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: parseFloat(first),
        second: parseFloat(second)
      })
    })
      .then((res) => res.json())
      .then((data) => {
        // alert(`The sum is ${ data.sum }`)
        setResult(data.sum)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      <h1>Calculate App From CI/CD Test</h1>
      { !result && <form onSubmit={ onAddNumbers }>
        <div className="input-container">
          <input autoFocus name="first" type="text" value={ numbers.first } onChange={ onInputChange } placeholder="Enter a number" />
          <input name="second" type="text" value={ numbers.second } onChange={ onInputChange } placeholder="Enter a number" />
        </div>
        <button className='calculate-btn' disabled={ !numbers.first || !numbers.second } type="submit">Show Sum</button>
      </form> }
      { result && <div className="result-container">
        <h2>Result</h2>
        <p> <b>{ numbers.first }</b> + <b>{ numbers.second }</b> equals to <b>{ result }</b></p>
        <button className='calculate-btn' type="button" onClick={ onRecalculate }>Calculate again</button>
      </div> }
    </>
  )
}

export default App
