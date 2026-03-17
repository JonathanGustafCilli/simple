import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [message, setMessage] = useState('Loading...')
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/message`)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Failed to load message'))
  }, [])

  return <h1>{message}</h1>
}

export default App
