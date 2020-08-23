import React from "react";
import { Query, QueryResult } from "react-apollo";
import { gql } from 'apollo-boost';
import { getAuthFromLS } from '../../helpers/local-storage.helper';
import Feed from './Feed/Feed';
import './Dashboard.scss';
import { Grid } from '@material-ui/core';
import { User } from '../../interfaces/user.model';

export interface Activity {
  name: string;
  id: number;
  start_date: string;
  location_country: string;
  type: string;
}

const ACTIVITIES = gql`
  query Activities($token: String, $page: String) {
    activities (token: $token, page: $page){
      name,
      start_date,
      location_country,
      type,
      id
    }
  }
`;

export function Dashboard() {
  const { athlete, access_token} = getAuthFromLS()

  if(!athlete?.profile || !athlete?.firstname) {
    return (
      <div>
        <div className="container-box">
          Error no user
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <Grid 
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      >
        <Grid item xs={3} className="dashboard-side-bar">
          <div className="dashboard-side-bar-image"><img className="image_profile" src={athlete.profile} alt="profile_pic"/></div>
          <div className="dashboard-side-bar-description">{ athlete.firstname } {athlete.lastname}</div>
        </Grid>
        <Grid item xs={9}>
          <Query query={ ACTIVITIES } variables={{ token: access_token,  page: `${1}` }}>
            { (result: QueryResult<any, Record<string, any>>)=> {
              const { data, fetchMore, error } = result;

              if (error) return (<div>{`Error! ${error.message}`}</div>);
              
              if (!data) return null;
              
              return (
                <Feed 
                activities={ data.activities }
                onLoadMore={(e: number) =>
                  fetchMore({
                    variables: {
                      page: `${e}`,
                      token: `${access_token}`
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
                      return Object.assign({}, prev, {
                        activities: [...prev.activities, ...fetchMoreResult.activities]
                      });
                    }
                  })
                }
                ></Feed>
              );
            }}
          </Query>        
            </Grid>
          </Grid> 
    </div>
    
  );
}

export default Dashboard;

