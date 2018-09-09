import React, {Component} from 'react'
import {extendObservable, toJS} from 'mobx'
import {observer} from 'mobx-react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'


class Login extends Component{
  constructor(props){
    super(props)

    extendObservable(this,{
      username:'',
      password:'',
      errors:{}

    })
  }
  onSubmit = async (evt) =>{
    evt.preventDefault()
    const {username, password} = this
    const response = await this.props.mutate({
      variables:{username, password}
    })

    const {ok, token, refreshToken, errors} = response.data.login
    if(errors) {
      this.errors = errors
      // must toJS - console.log(toJS(this.errors))
    }
    if(ok){
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
        this.props.history.push('/')
    }
  }
  onChange = e=>{
    const {name, value} = e.target
    this[name] = value
  }

  render (){
    const {username, password} = this
    return (
    <div>
    <h1>Login</h1>
      <form onSubmit={this.onSubmit} >
        <div>
          <label htmlFor="username"><small>Username</small></label>
          <input name="username" type="text" onChange={this.onChange} value={username} placeholder="Username" required minLength="1"/>
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" onChange={this.onChange} value={password} placeholder="password" required minLength="5"/>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )}
}

const loginMutation = gql`
mutation login($username:String!, $password:String!){
  login(username:$username, password:$password){
    ok
    token
    refreshToken
    errors{
      path
      message
    }
  }
}
`
export default graphql(loginMutation)(observer(Login))