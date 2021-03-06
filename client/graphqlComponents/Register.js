import React, {Component} from 'react'
import { graphql } from 'react-apollo'
import {gql} from 'apollo-boost'
import {  red500 } from 'material-ui/styles/colors';

/**
 * COMPONENT
 */
class Register extends Component {
 constructor(props){
   super(props)
    this.state= {
      username:"",
      password:"",
      firstName:"",
      lastName:"",
      errors:[]
    }}

    onSubmit=  async (evt)=>{     
      evt.preventDefault();
      const {username, password, firstName, lastName}=this.state
      const response = await this.props.mutate({
        variables:this.state,
        refetchQueries:[{query:allUsersQuery}]
      })
      const {ok, errors} = response.data.signUp
      
      if(ok){
        this.props.history.push('/')
      } else {
        this.setState({errors})
      }
       
    }
    
 render() {
   const {errors} = this.state
   return (
    <div>
    <h1>Register</h1>
      <form onSubmit={this.onSubmit} >
        <div>
          <label htmlFor="username"><small>Username</small></label>
          <input name="username" type="text" onChange={(event)=>this.setState({username:event.target.value})} placeholder="Username" required minLength="1"/>
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" onChange={(event)=>this.setState({password:event.target.value})} placeholder="password" required minLength="5"/>
        </div>
        <div>
          <label htmlFor="firstName"><small>First Name</small></label>
          <input name="firstName" type="text" onChange={(event)=>this.setState({firstName:event.target.value})} placeholder="First Name" required minLength="1"/>
        </div>
        <div>
          <label htmlFor="LastName"><small>Last Name</small></label>
          <input name="lastName" type="text" onChange={(event)=>this.setState({lastName:event.target.value})} placeholder="Lastname" required minLength="1"/>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        { errors.length > 0 ? errors.map((err,idx)=><div key={idx} style = {{color:red500}}>{err.message}</div>) : ''}
      </form>
    </div>
  )}
}

const registerMutation = gql`
    mutation SignUp($username:String!, $password:  String!, $firstName: String!,$lastName:  String!){
                signUp( username:$username
                    password:$password
                    firstName:$firstName
                    lastName:$lastName
                    ){
                        ok
                        errors{
                          path
                          message
                        }
                        user{
                          id
                          username
                          firstName
                          lastName
                        }
                    }
            }
`

const allUsersQuery = gql`
  {
    allUsers {
      id
      username
    }
  }
`

export default graphql(registerMutation)(Register)


