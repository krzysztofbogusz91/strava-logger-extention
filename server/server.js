const express = require('express');
const fetch = require("node-fetch");
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const schema = require('./shema')
const keys = require('./keys')

const app = express();
app.use(cors());

app.get('/auth', function (req, res) {
  const code = req.query.code
  const secret = keys.sec;
  const url = new URL("https://www.strava.com/oauth/token");
  const params = { client_id: '43111', client_secret: secret, code, grant_type: 'authorization_code'}
 
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  fetch('' + url, {
    method: 'POST', 
    mode: 'cors',
  }).then(resp => {
    return (resp.json())
  }).then ( resps => {
    const user = resps.athlete
    const access_token = resps.access_token;
    const refresh_token = resps.refresh_token
    res.send({ access_token, refresh_token, user });
  }).catch(err => {
    console.log('Error while getting token', err);
    res.send({err: 'error!'})
  })
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))
const PORT = process.env.PORT || 5000

app.listen(PORT), () => {
  console.log('server started on port ', PORT)
};