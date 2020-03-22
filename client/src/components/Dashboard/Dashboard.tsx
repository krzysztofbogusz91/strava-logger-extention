import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
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

function Dashboard(props: any) {
  const [ user, setUser ] = useState({firstname: '', lastname: '', profile: ''});
  const [ activities, setActivities ] = useState([]);
  useEffect(() => {

    const { athlete, token} = getAuthFromLS()
    const authUser = !props.athlete ? athlete : props.athlete;
    const access_token = !props.token ? token : props.token;
    console.log(authUser);
    
    setUser(authUser);

    fetch('https://www.strava.com/api/v3/activities', {
    headers: new Headers({ 'Authorization': 'Bearer ' + access_token })
  }).then(re =>{
    return re.json();
  }).then(res => {
    if(!!res.errors) {
      console.log('got err', res);
      setActivities([])
      return null;
    } else {
      setActivities(res)
      console.log('got res', res)
    }
  })
  .catch(err => console.log('GOT ERR: ', err)
  )
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
        {activities.length > 0 ? displayActivities(activities) : 'Loading activities...'}
        </ul>
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
  console.log('state', state);
  
  const { token , athlete } = state
  return { token, athlete }
}

export default connect(mapStateToProps)(Dashboard)

