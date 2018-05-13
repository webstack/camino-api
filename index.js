require('./mongoose/index')
const { ApolloServer } = require('apollo-server')
const { port, host, virtualUrl } = require('./conf/index')
const typeDefs = require('./graphql/schemas')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({ typeDefs, resolvers })

server.listen({ port, host }).then(({ url }) => {
  console.log(`🚀 Server ready at ${virtualUrl || url}`)
})