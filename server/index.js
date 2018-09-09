const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const db = require('./db')
const PORT = process.env.PORT || 8080
const app = express()
const socketio = require('socket.io')
const cors = require('cors')

//GraphQL stuff
const graphqlHTTP = require('express-graphql')
const {user, password} = require('../secrets')
const mongoose = require('mongoose')
// const schema = require('./schema')
const { ApolloServer, gql } = require('apollo-server-express')
const {mergeTypes , mergeResolvers, fileLoader} = require ('merge-graphql-schemas')
const models = require('./models')
module.exports = app

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project
 * root. This file is included in the .gitignore - it will NOT be tracked
 * or show up on Github. On your production server, you can add these
 * keys as environment variables, so that they can still be read by the
 * Node process on process.env
 */
if (process.env.NODE_ENV !== 'production') require('../secrets')
const SECRET = 'VEZ'
const SECRET2 = 'TAN'

const createApp = async () => {
  // logging middleware
  app.use(morgan('dev'))
  
  //Cross-origin resource sharing - cross-origin request
  app.use(cors())
  // body parsing middleware
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  //Graph ql and mlab database
  await mongoose.connect(`mongodb://${user}:${password}@ds127389.mlab.com:27389/gql-journal`)
  mongoose.connection.once('open', ()=>{
    console.log('connected to mongodb databasessss')
  })


  const typeDefs = mergeTypes(fileLoader(path.join(__dirname,'./schemas')), {all:true})

  //will merge even with js/ts?
  const resolvers = mergeResolvers(fileLoader(path.join(__dirname, "./resolvers")))

  const server = await new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
      endpoint: '/graphql',
      settings: {
        'editor.cursorShape': 'block',
        'editor.theme': 'light'
      }
    }, context: {
      models,
      SECRET,
      SECRET2
    }
  })

  server.applyMiddleware({ app })

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.use('/graphql', () => {})
  
  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = async () => {
  // start listening (and create a 'server' object representing our server)
  const server = await app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`))

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}

if (require.main === module) {
    createApp()
    startListening()
} else {
  createApp()
}
