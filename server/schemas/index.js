// const graphql = require('graphql')
// const _ = require('lodash') 
// const bcrypt = require('bcrypt')
// const {Author, Book, User, Expense, WaterIntake} = require('../models')

// const {
//   GraphQLObjectType, 
//   GraphQLString, //Example:"1"
//   GraphQLSchema,
//   GraphQLID, //Example: "1" or 1 Note-JS still sees as string
//   GraphQLInt,
//   GraphQLList,
//   GraphQLNonNull//required for non-null fields,
// } = graphql

// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: ()=>({
//     id:{type:GraphQLID},
//     username:{type: GraphQLString},
//     password:{type: GraphQLString},
//     firstName:{type:GraphQLString},
//     lastName:{type:GraphQLString}
//   })
// })

// const BookType = new GraphQLObjectType({
//   name:'Book',
//   fields: () => ({ // must wrap so it can be loaded in js creation phase
//     id:{type:GraphQLID}, 
//     name: {type: GraphQLString},
//     genre:{type: GraphQLString},
//     author: {type:AuthorType,//setup relationships
//     resolve(parent,args){ //parents refers to the book object queried
//       //return _.find(authors,{id:parent.authorId})
//       return Author.findById(parent.authorId)
//       }
//     }
//   })
// })

// const AuthorType = new GraphQLObjectType({
//   name:'Author',
//   fields: () => ({ // must wrap so it can be loaded
//     id:{type:GraphQLID}, 
//     name: {type: GraphQLString},
//     age:{type: GraphQLInt},
//     books:{type:new GraphQLList(BookType), // because it is a list of books must use GraphQLList
//       resolve(parent,args){
//         // return _.filter(books, {authorId:parent.id})
//       return Book.find({authorId: parent.id})
//       }
//     }
//   })
// })


// const RootQuery = new GraphQLObjectType({ // this jumps into the graph
//   name: 'RootQueryType',
//   fields:{
//     book:{
//       type: BookType, 
//       args:{id:{type: GraphQLID}}, // this must match whatever type you set id to previously
//       resolve(parent,args){// after you get a query it fires the resolve function
//         //code to get data from db/other source
//         // return _.find(books,{id:args.id})
//         return Book.findById(args.id)
//       }
//     },
//     author:{
//       type: AuthorType,
//       args:{id:{type:GraphQLID}},
//       resolve(parent,args){
//         // return _.find(authors,{id:args.id})
//         return Author.findById(args.id)
//       }
//     },
//     books:{ // this is so we can get list of books or whatever type
//       type: new GraphQLList(BookType),
//       resolve(parent,args){
//         // return books
//         return Book.find({}) // returns all without argument
//       }
//     },
//     authors:{
//       type: new GraphQLList(AuthorType),
//       resolve(parent,args){
//         // return authors
//         return Author.find({})
//       }
//     }
//   }
// })

// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     login:{
//       type: UserType,
//       args:{username:{type:new GraphQLNonNull(GraphQLString)}, password:{type:new GraphQLNonNull(GraphQLString)}},
//       resolve(parent, args){
//         //Simple authorization using bcrypt Sync
//        return User.findOne({username:args.username})
//        .then(user=>{
//          if(user && bcrypt.compareSync(args.password,user.password )){
//           return user  
//          }
//          throw new Error("wrong password")
//        })
//        .catch(err=>console.log(err))
//       }
//     },
//       addAuthor: {
//           type: AuthorType,
//           args: {
//               name: { type: new GraphQLNonNull(GraphQLString) },
//               age: { type: new GraphQLNonNull(GraphQLInt) }
//           },
//           resolve(parent, args){
//               let author = new Author({
//                   name: args.name,
//                   age: args.age
//               })
//               return author.save()
//           }
//       },
//       addBook: {
//         type: BookType,
//         args: {
//           name: { type: new GraphQLNonNull(GraphQLString) },
//           genre: { type: new GraphQLNonNull(GraphQLString) },
//           authorId: { type: new GraphQLNonNull(GraphQLID) }
//         },
//         resolve(parent,args){
//           let book = new Book({
//             name: args.name,
//             genre: args.genre,
//             authorId: args.authorId
//           })
//           return book.save()
//         }
//       },
//       addUser:{
//         type: UserType,
//         args:{
//           username: {type: new GraphQLNonNull(GraphQLString)},
//           password: {type: new GraphQLNonNull(GraphQLString)},
//           firstName: {type: new GraphQLNonNull(GraphQLString)},
//           lastName: {type: new GraphQLNonNull(GraphQLString)}
//         },
//         resolve (parent, args){
//           //encrypt using bcrypt sync
//           let salt = bcrypt.genSaltSync(10)
//           let hashedpw = bcrypt.hashSync(args.password, salt)
//           let user = new User({
//             username: args.username,
//             password: hashedpw,
//             firstName: args.firstName,
//             lastName: args.lastName
//           })
//           return user.save()
//         }
//       }
//   }
// })

// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation
// })

