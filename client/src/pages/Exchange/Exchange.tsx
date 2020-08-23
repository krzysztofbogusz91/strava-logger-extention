import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { setAuthInLS } from '../../helpers/local-storage.helper';

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

export const Exchange = ( props: any) => {
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
        props.history.push('/login')
        return;
      }
      const access_token = authData.token;
      const refresh_token = authData.refresh_token;
      const athlete = authData.user;
      
      if(!!access_token && !!athlete){
        setAuthInLS({access_token, refresh_token, athlete});
        props.history.push('/dashboard')
      }
    }

    return (
      <div className="ExchangePage">
        {!!error ? 'Error' : null}
        {!!loading ? 'Loading...' : null}
      </div>
    )
}

export default Exchange;
