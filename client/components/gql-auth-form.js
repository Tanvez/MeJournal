import React, {Component} from 'react'
import { graphql, Query } from 'react-apollo'

import {login, getUserQuery} from '../queries'

/**
 * COMPONENT
 */
class GqlLogin extends Component {
 
  constructor(props){
    super(props)
    this.state= {
      username:"",
      password:""
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

    onSubmit= ()=>{

      //mutation -> variables
     // const {username, password}=this.state
      const response = this.props.mutate({
        variables:{username, password}
      })
      console.log(username,password)
    }

 render() {
   //console.log(this.props.mutate)
   return (
    <div>
      <form onSubmit={this.onSubmit} name={name}>
        <div>
          <label htmlFor="username"><small>username</small></label>
          <input name="username" type="text" onChange={(event)=>this.setState({username:event.target.value})}/>
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" onChange={(event)=>this.setState({password:event.target.value})}/>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )}
}

export default graphql(login)(GqlLogin)


