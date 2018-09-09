import React,{Component} from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

class Home extends Component {
  displayUsers(){
  let data = this.props.data
  console.log(data)
  if(data.loading){
    return( <div>Loading Users...</div> )
  } else {
    return data.allUsers.map(u => {
      return(
          <li key={ u.id }>{ u.username }</li>
      );
  })
  }
}

render() {
  return (
    <div>
    <h2>User LIST</h2>
      <ul id="user-list">
        { this.displayUsers() }
      </ul>
    </div>
  )
}
}
const allUsersQuery = gql`
  {
    allUsers {
      id
      username
    }
  }
`

export default graphql(allUsersQuery)(Home)