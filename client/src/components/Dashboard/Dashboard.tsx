import React from "react";
import { Query, QueryResult } from "react-apollo";
import { connect } from 'react-redux';
import { gql } from 'apollo-boost';
import { getAuthFromLS } from '../../helpers/local-storage.helper';
import './Dashboard.scss';
import Feed from './Feed/Feed';


export interface User {
  firstname: string;
  lastname: string;
  profile: string;
}

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

function Dashboard(props: any) {
  const { athlete, access_token} = getAuthFromLS()
  const authUser = !props.athlete ? athlete : props.athlete;
  const token = !props.token ? access_token : props.token;
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-side-bar">
        <div className="dashboard-side-bar-image"><img className="image_profile" src={authUser.profile} alt="profile_pic"/></div>
        <div className="dashboard-side-bar-description">{ authUser.firstname } {authUser.lastname}</div>
      </div>
      <Query query={ ACTIVITIES } variables={{ token,  page: `${1}` }}>
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
                  token: `${token}`
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
    </div>
  );
}

function mapStateToProps(state: any) {
  const { token , athlete } = state
  return { token, athlete }
}

export default connect(mapStateToProps)(Dashboard)

