const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name: String,
  amount: String,
  userId: String
})

module.exports = mongoose.model('Expense', expenseSchema)