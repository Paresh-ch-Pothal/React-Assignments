import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TranslationProvider } from './context/TranslationContext'
import TranslatorPage from './pages/TranslatorPage'

function App() {

  return (
    <><TranslationProvider>
      <TranslatorPage/>
    </TranslationProvider>
    </>
  )
}

export default App
