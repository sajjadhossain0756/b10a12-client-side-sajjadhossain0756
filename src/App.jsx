import { useContext } from 'react'
import './App.css'
import { AuthContext } from './provider/AuthProvider'

function App() {
  const {user} = useContext(AuthContext)

  return (
    <>
      <h1 className='text-5xl'>Assignment 12 {user}</h1>
    </>
  )
}

export default App
