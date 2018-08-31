import React from 'react'
//import {Navbar} from './components'
import Routes from './routes'
import Home from './graphqlComponents/Home'
import Register from './graphqlComponents/Register'

const App = ()=>{
  return(
    <div>
    <Routes />
    <Register/>
    <Home/>
    </div>
  )
}
export default App