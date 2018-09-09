import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql, compose } from 'react-apollo'
import {getAuthorsQuery,getBooksQuery, addBookMutation} from '../queries'

class AddBook extends Component {
  constructor(props){
    super(props)
    this.state= {
      title:"",
      authorId:"",
      genre:""
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  displayAuthors(){
    let data = this.props.getAuthorsQuery
    
    if(data.loading){
      return( <option disabled>Loading authors...</option> )
    } else {
      return data.authors.map(author =>
          <option key={ author.id } value={author.id}>{ author.name }</option>
      )
    }
  }
  
  onSubmit(event){
    event.preventDefault()
    //mutation -> variables
    this.props.addBookMutation({
      variables:{
        name:this.state.title,
        genre:this.state.genre,
        authorId:this.state.authorId
      },
      refetchQueries:[{query:getBooksQuery}] //apply another query
    })
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.onSubmit}>

        <div className="field">
          <label>Book Name:</label>
          <input type="text" onChange={(event)=>this.setState({title:event.target.value})}/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(event)=>this.setState({genre:event.target.value})}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={(event)=>this.setState({authorId:event.target.value})}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>

      </form>
    )
  }
}

//compose queries
export default compose(
  graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
  graphql(addBookMutation, {name:"addBookMutation"})
)(AddBook)
//note you can also give it a name, ex: getBooksQuery,{name: "getBooksQuery"} -> this.props.getBooksQuery