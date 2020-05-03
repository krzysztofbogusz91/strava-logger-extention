import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { saveToken } from '../actions';
import { setAuthInLS } from '../helpers/local-storage.helper';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
interface AuthData {
  token: string;
  refresh_token: string;
  user: {
    firstname: string;
    lastname: string;
    profile: string;
  }
}
const AUTH = gql`
  query LoginData($code: String) {
    auth (code: $code){
      token,
      refresh_token,
      user {
        firstname,
        lastname,
        profile,
      }
    }
  }
`;

export const ExchangePage = ( props: any) => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  const { loading, error, data } = useQuery(AUTH, {
    variables: { code }
  });
  
  useEffect(() => {
    if(!!data) {
      gotData(data.auth)
    }
  }, [data])

  const gotData = (authData: AuthData) => {
      if(!authData) {
        setTimeout(()=>{
          props.history.push('/login')
        }, 1)
        return null;
      }
      const access_token = authData.token;
      const refresh_token = authData.refresh_token;
      const athlete = authData.user;
      if(!!access_token && !!athlete){
        props.saveToken(access_token, refresh_token, athlete);
        setAuthInLS({access_token, refresh_token, athlete});
        setTimeout(()=>{
          props.history.push('/dashboard')
        }, 1)
      }
    }

    return (
      <div className="ExchangePage">
        {!!error ? 'Error' : null}
        {!!loading ? 'Loading...' : null}
      </div>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
  saveToken: (token:any, refresh:any, user:any) => dispatch(saveToken(token, refresh, user)),
});

export default connect(null, mapDispatchToProps)(ExchangePage);
