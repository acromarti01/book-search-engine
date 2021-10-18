const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID! 
    bookId: String
    authors: [String]
    description: String
    title: String!    
    image: String
    link: String    
  }

  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int 
    savedBooks: [Book]
  }

  input BookInput {
    bookId: String
    authors: [String]
    description: String 
    title: String
    link: String   
    image: String    
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(userId: ID!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, input: BookInput): User
    removeBook(bookId: String!): User    
  }
`;

module.exports = typeDefs;
