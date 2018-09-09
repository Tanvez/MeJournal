import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addExpenseItem} from '../store'

const ExpenseForm = (props)=> {
    const {handleSubmit,userId} = props
    return (
        <div>
                <h1>EXPENSE</h1>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='item' placeholder='item' />
                    <input type='float' name='price' placeholder='price' />
                    <button name='userId' value={userId} type='submit'>Submit</button>
                </form>
        </div>    
        );
}

const mapToState = (state) =>{
return {

    }
}

const mapDispatch = (dispatch)=>{
    return {
        handleSubmit (evt) {
        evt.preventDefault()
        const item = evt.target.item.value
        const price = evt.target.price.value
        const userId = evt.target.userId.value
        dispatch(addExpenseItem( userId, item, price))
        }
    }
}
export default connect(mapToState,mapDispatch)(ExpenseForm)
