import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieInterface from './components/MovieInterface'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MovieInterface/>
    </>
  )
}

export default App
