const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema, Query, GraphQLOutputType } = require('graphql');
const { token } = require('./keys')
const axios = require('axios');
const access_token = token;

axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 

// axios.get('https://www.strava.com/api/v3/athlete')
//             .then(res => console.log(res.data));

const AthleteData = new GraphQLObjectType({
  name: 'BasicAthleteData',
  fields: () => ({
    id: {type: GraphQLInt},
    lastname: {type: GraphQLString},
    firstname: {type: GraphQLString},
    city: {type: GraphQLString}
  })
})


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    athleteData: {
      type: AthleteData,
      resolve(parent, agrs) {
        return axios.get('https://www.strava.com/api/v3/athlete')
          .then(res => res.data);
      }
    }
  }),
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})