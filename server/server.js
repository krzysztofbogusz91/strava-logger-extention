const express = require('express');
const fetch = require("node-fetch");
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./shema')

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))
const PORT = process.env.PORT || 5000

app.listen(PORT), () => {
  console.log('server started on port ', PORT)
};