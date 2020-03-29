const { GraphQLObjectType, GraphQLInt, GraphQLFloat,  GraphQLString, GraphQLSchema, GraphQLList, Query, GraphQLOutputType } = require('graphql');
const keys = require('./keys')
const axios = require('axios');

const UserModel = new GraphQLObjectType({
  name: 'UserModel',
  fields: () => ({
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    profile: { type: GraphQLString },
  })
})

const LoginData = new GraphQLObjectType({
  name: 'LoginData',
  fields: () => ({
    token: { type: GraphQLString },
    refresh_token: { type: GraphQLString },
    user: { type: UserModel },
  })
})

const AuthModel = new GraphQLObjectType({
  name: 'AuthModel',
  fields: () => ({
    token: { type: GraphQLString },
    refresh_token: { type: GraphQLString }
  })
})

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
        return axios.get('https://www.strava.com/api/v3/athlete')
          .then(res => res.data);
      }
    },
    activities: {
      type: new GraphQLList(ActivityData),
      resolve(parent, args) {
        return axios.get('https://www.strava.com/api/v3/activities')
          .then(res => res.data)
      },
    },
    auth: {
      type: LoginData,
      args: {
        code: {type: GraphQLString},
      },
      resolve(parent, args) {
        const code = args.code;
        const secret = keys.sec;
        const params = { client_id: '43111', client_secret: secret, code, grant_type: 'authorization_code'}
        const url = new URL("https://www.strava.com/oauth/token" );
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return axios.post('' + url, {
          mode: 'no-cors',
          headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      },
        )
          .then(res => {
            return {
              token: res.data.access_token,
              refresh_token: res.data.refresh_token,
              user: {...res.data.athlete }
            };
          })
      },
    },
    authRefresh: {
      type: AuthModel,
      args: {
        refresh_token: {type: GraphQLString},
      },
      resolve(parent, args) {
        const secret = keys.sec;
        const params = { client_id: '43111', client_secret: secret, refresh_token: args.refresh_token, grant_type: 'refresh_token'}
        const url = new URL("https://www.strava.com/oauth/token" );
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return axios.post('' + url, {
          mode: 'no-cors',
          headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
      },
        )
          .then(res => {
            return {
              token: res.data.access_token,
              refresh_token: res.data.refresh_token,
            };
          })
      },
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
})