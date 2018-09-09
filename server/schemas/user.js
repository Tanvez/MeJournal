export default `
  type User {
    id: ID
    username: String
    firstName: String
    lastName: String
    email: String
  }

  type Query {
    getUser(id: String!): User
    allUsers: [User!]!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error!]
  }

  type LoginResponse {
    ok:Boolean!
    token: String
    refreshToken: String
    errors: [Error!]
  }

  type Mutation {
    signUp (username: String!, firstName: String!,lastName: String!, password: String!,): RegisterResponse!
    login(username: String!, password: String!) : LoginResponse!
  }
 
`