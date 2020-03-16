import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { saveToken } from '../actions';
import { connect } from 'react-redux';
type Props = {
  saveToken: any;
}
type State = {
  token: string;
}
class ExchangePage extends Component <Props, State> {

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const url = new URL("https://www.strava.com/oauth/token");
    const params: any = { client_id: '43111', client_secret:'', code, grant_type: 'authorization_code'}
   
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    fetch('' + url, {
      method: 'POST', 
      mode: 'cors',
    }).then(resp => {
      return (resp.json())
    }).then ((resps: any) => {
      console.log(resps);
      const access_token = resps.access_token;
      // to do move to graph ql
      // to do save token to store
      // to do redirect to dashbord than call qrapql
      this.saveToken(access_token);
      fetch('https://www.strava.com/api/v3/activities', {
        headers: new Headers({ 'Authorization': 'Bearer ' + access_token })
      }).then(resp2 =>{
        return resp2.json();
      }).then(resp3 => console.log(resp3))
    })
  }

  render() {
    return (
      <div className="ExchangePage">
        Loadning... .. .
      </div>
    )
  }
}

ExchangePage.propTypes = {
  saveToken: PropTypes.func,
};

ExchangePage.defaultProps = {
  getHeroes: null,
};

const mapDispatchToProps = (dispatch: any) => ({
  saveToken: (token: any) => dispatch(saveToken(token)),
});

export default connect(null, mapDispatchToProps)(ExchangePage);