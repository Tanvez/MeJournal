import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
//import {Navbar} from './components'
//import Routes from './routes'
import Home from './graphqlComponents/Home'
import Register from './graphqlComponents/Register'
import Login from './graphqlComponents/Login'

const App = ()=>{
  return(
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/login" exact component={Login}/>
    </Switch>
  )
}
export default App