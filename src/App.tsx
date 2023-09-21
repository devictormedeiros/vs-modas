import { useState } from 'react'
import './App.css'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Bem vindos á loja VsModas</h1>
      <h2>salve</h2>
      <Header />
    </>
  )
}

export default App
