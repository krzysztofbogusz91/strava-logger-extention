import React, { Component } from 'react'

export default class ExchangePage extends Component {

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
    }).then (resps => console.log(resps))
  }

  render() {
    return (
      <div className="ExchangePage">
        Loadning... .. .
      </div>
    )
  }
}
