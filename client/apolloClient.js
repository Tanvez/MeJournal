import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri:'http://localhost:8080/graphql'// need to change if you want to deploy
})

export default client

// import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';

// const client = new ApolloClient({
//   // By default, this client will send queries to the
//   //  `/graphql` endpoint on the same host
//   link: new HttpLink(),
//   cache: new InMemoryCache()
// });