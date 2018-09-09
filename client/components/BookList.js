import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { graphql } from 'react-apollo'
import {getBooksQuery} from '../queries'

class BookList extends Component {

  displayBooks(){
    let data = this.props.data
    console.log(data)
    if(data.loading){
      return( <div>Loading books...</div> )
    } else {
      return data.books.map(book => {
        return(
            <li key={ book.id }>{ book.name }</li>
        );
    })
    }
  }

  render() {
    return (
      <div>
      <h2>BOOK LIST</h2>
        <ul id="book-list">
          { this.displayBooks() }
        </ul>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
//note you can also give it a name, ex: getBooksQuery,{name: "getBooksQuery"} -> this.props.getBooksQuery