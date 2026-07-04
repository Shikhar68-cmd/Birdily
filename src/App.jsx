import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Explore from './pages/Explore'
import About from './components/About'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path = '/' element = {<Homepage/>}/>
          <Route path = '/explore' element = {<Explore/>}/>
          <Route path  = '/about' element = {<About />}/>
        </Routes>


    </div>
  )
}

export default App