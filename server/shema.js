const { GraphQLObjectType, GraphQLInt, GraphQLFloat,  GraphQLString, GraphQLSchema, GraphQLList, Query, GraphQLOutputType } = require('graphql');
const axios = require('axios');

const AthleteData = new GraphQLObjectType({
  name: 'BasicAthleteData',
  fields: () => ({
    id: {type: GraphQLFloat},
    lastname: {type: GraphQLString},
    firstname: {type: GraphQLString},
    city: {type: GraphQLString}
  })
})

const ActivityData = new GraphQLObjectType({
  name: 'BasicActivityData',
  fields: () => ({
    id: {type: GraphQLFloat},
    name: {type: GraphQLString},
    start_date: {type: GraphQLString},
    location_country: {type: GraphQLString},
    type: {type: GraphQLString},
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    athleteData: {
      type: AthleteData,
      args: {
        token: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${args.token}` 
        return axios.get('https://www.strava.com/api/v3/athlete')
          .then(res => res.data);
      }
    },
    activities: {
      type: new GraphQLList(ActivityData),
      args: {
        token: {
          type: GraphQLString
        },
        page: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        console.log('args', args);
        axios.defaults.headers.common['Authorization'] = `Bearer ${args.token}` 
        return axios.get(`https://www.strava.com/api/v3/activities?page=${args.page}`)
          .then(res => {
            console.log(res.data.length)
            return res.data});
      }
    }
  }),
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})