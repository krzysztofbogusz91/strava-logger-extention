const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLSchema } = require('graphql');
const { token } = require('./keys')
const axios = require('axios');
const access_token = token;
console.log(token);
axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 

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
    },
    athlete: {
      type: AthleteData,
      args: {
        id: { type: GraphQLInt },
        firstname: {type: GraphQLString},
      }, 
      resolve(parent, args) {
          return axios.get('https://www.strava.com/api/v3/athlete')
            .then(res => res.data);
        }
      },
  }),
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})