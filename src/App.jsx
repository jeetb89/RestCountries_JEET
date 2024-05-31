import { useState } from 'react'
import Nav from './component/Nav.jsx'
import Countries from './component/Body.jsx'
import './App.css'
 import {Routes,Route} from 'react-router-dom'
import CountryDetails from './component/CountryDetails.jsx'
 import ThemeContext from './component/ThemeContext.jsx'

 function App() {

  const [mode,setMode] = useState(false)

  return (
    <ThemeContext.Provider value={{mode,setMode}}>
    <Nav/> 
      <Routes>
         <Route path="/"  element={ <Countries/>  }/>
         <Route path="countries/:id" element={<CountryDetails/>}></Route> 
      </Routes>
    </ThemeContext.Provider>
  )
}

export default App
