import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Prompt from './components/Prompt.jsx'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [load, setLoad] = useState('')
  const [error, setError] = useState('')
  const [history, setHistory] = useState('')
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Prompt></Prompt>
    </div>
  )
}

export default App
