const mongoose = require('mongoose')
const Schema = mongoose.Schema

const waterIntakeSchema = new Schema({
  amount:Number,
  measurement:String,
  dateTime:String,
  userId:String
})

module.exports = mongoose.model('WaterIntake', waterIntakeSchema)