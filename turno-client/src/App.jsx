import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
        <p>
          Name: Renan S. Turno<br/>
          Email: turnors@students.national-u.edu.ph<br/>
          Other Personal Info: <a href='https://github.com/nansu-cmd/turno-webprog.git'>My Repository</a>
        </p>
      </header>
    </div>
  )
}

export default App