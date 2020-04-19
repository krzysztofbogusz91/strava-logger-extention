import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { saveToken } from '../actions';
import { setAuthInLS } from '../helpers/local-storage.helper';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: any;
}
 
export const ExchangePage = ( props: any) => {

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const url = "http://localhost:5000/auth" + `?code=${code}`;
   
    fetch('' + url, {
      method: 'GET', 
      mode: 'cors',
    }).then(resp => resp.json())
      .then ((resps: AuthResponse) => {
      const { access_token, refresh_token} = resps;
      const athlete = resps.user;
      if(!!access_token && !!athlete){
        props.saveToken(access_token, refresh_token, athlete);
        setAuthInLS({access_token, refresh_token, athlete});
        props.history.push('/dashboard')
      }
    }).catch(err => {
      console.log('error exchange', err);
      
    })
  }, []);

    return (
      <div className="ExchangePage">
        Loadning... .. .
      </div>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
  saveToken: (token:any, refresh:any, user:any) => dispatch(saveToken(token, refresh, user)),
});

export default connect(null, mapDispatchToProps)(ExchangePage);
