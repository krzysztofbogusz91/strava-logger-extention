const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const schema = require('./shema');

const cors = require('cors');

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
  formatError: (err) => {
    if (err.message.startsWith("Request failed with status code 401")) {
      const msg =  err.extensions.exception.response.statusText || 'Unauthorized'
      return new AuthenticationError(msg);
    }
    
    return err;
  },
});

const app = express();
app.use(cors());
server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
)