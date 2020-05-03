import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { getAuthFromLS } from '../../helpers/local-storage.helper';
import './Dashboard.scss';

interface User {
  firstname: string;
  lastname: string;
  profile: string;
}

interface Activity {
  name: string;
  id: number;
  start_date: string;
  location_country: string;
  type: string;
}

const ACTIVITIES = gql`
  query Activities {
    activities {
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
  const [ user, setUser ] = useState({firstname: '', lastname: '', profile: ''});
  const authUser = !props.athlete ? athlete : props.athlete;
  const token = !props.token ? access_token : props.token;
  
  const { loading, error, data } = useQuery(ACTIVITIES);
  

  useEffect(() => {
    setUser(authUser);
  }, []);

  const displayActivities = (activities: Activity[]) => {
    return activities.map( (activity: Activity) => {
      return (
        <li className="dashboard-content-list-element" key={activity.id}>
          <div>Activity: {activity.name}</div>
          <div>Type: {activity.type}</div>
          <div>Started: {activity.start_date}</div>
          <div>Location: {activity.location_country}</div>
        </li>
      )
    });
  }


  return (
    <div className="dashboard-container">
      <div className="dashboard-side-bar">
        <div className="dashboard-side-bar-image"><img className="image_profile" src={user.profile} alt="profile_pic"/></div>
        <div className="dashboard-side-bar-description">{ user.firstname } {user.lastname}</div>
      </div>
      <div className="dashboard-content">
        <ul className="dashboard-content-list">
          {!!error ? 'err' : null}
        {!!data && data.activities.length > 0 ? displayActivities(data.activities) : 'Loading activities...'}
        </ul>
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
  const { token , athlete } = state
  return { token, athlete }
}

export default connect(mapStateToProps)(Dashboard)

