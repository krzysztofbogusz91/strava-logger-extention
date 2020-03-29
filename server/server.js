const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const schema = require('./shema');

const cors = require('cors');
const axios = require('axios');

const axiosAuthMiddleware = (req, res, next) => {
  if(!!req.headers['authorization']){
    axios.defaults.headers.common['Authorization'] = req.headers['authorization']; 
  }
  next();
}

const server = new ApolloServer({
  schema,
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
app.use(axiosAuthMiddleware);
server.applyMiddleware({ app });

const PORT = process.env.PORT || 5000

app.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
)