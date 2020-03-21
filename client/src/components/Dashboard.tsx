import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { getAuthFromLS } from '../helpers/local-storage.helper';

function Dashboard(props: any) {
  const [ user, setUser ] = useState({firstname: ''});
  useEffect(() => {

    const { athlete, token} = getAuthFromLS()
    const authUser = !props.athlete ? athlete : props.athlete;
    const access_token = !props.token ? token : props.token;
    setUser(authUser);

    fetch('https://www.strava.com/api/v3/activities', {
    headers: new Headers({ 'Authorization': 'Bearer ' + access_token })
  }).then(re =>{
    return re.json();
  }).then(res => console.log(res))
  }, []);



  return (
    <div className="Dashboard">
      Welcome To Dashboard  { user.firstname }
    </div>
  );
}

function mapStateToProps(state: any) {
  console.log('state', state);
  
  const { token , athlete } = state
  return { token, athlete }
}

export default connect(mapStateToProps)(Dashboard)

