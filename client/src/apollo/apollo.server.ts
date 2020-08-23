import { onError, ErrorResponse,  } from 'apollo-link-error';
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { gql, Observable, GraphQLRequest, NormalizedCacheObject, Operation, ApolloClient, from,  } from 'apollo-boost';
import { getAuthFromLS, setAuthInLS } from '../helpers/local-storage.helper';

export const apolloMiddleware = setContext((operation: GraphQLRequest) => {
  const { access_token } = getAuthFromLS();
  return {
    headers: {
      authorization: access_token ? `Bearer ${access_token}` : ''
    }
  };
});

export const promiseToObservable = (promise: Promise<any>): Observable<any> =>
  new Observable((subscriber: any) => {
    promise.then(
      value => {
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      },
      err => subscriber.error(err)
    );
  });

export const onRefreshToken = (cli: ApolloClient<NormalizedCacheObject>, operation: Operation) => {
    const {refresh_token } = getAuthFromLS();
    
    return cli.query({
      query: gql`
              query RefreshLoginData($refresh_token: String) {
                  authRefresh (refresh_token: $refresh_token){
                    token,
                    refresh_token,
                  }
                }
    `, variables: { refresh_token : refresh_token }})
        .then((result: any) =>{
          const { athlete } = getAuthFromLS();
          const { token, refresh_token } = result.data.authRefresh;

          setAuthInLS({ athlete, access_token: token, refresh_token })
    })
}

export const errorLink = onError(
    ({
      networkError,
      graphQLErrors,
      operation,
      forward
    }: ErrorResponse): any => {
      if (networkError) {
        switch ((networkError as any).statusCode) {
          case 401:
            return promiseToObservable(onRefreshToken(cli, operation)).flatMap(() => forward(operation));
          default:
            break;
        }
      }
      if (Array.isArray(graphQLErrors)) {
        for(let err of graphQLErrors) {
          switch (err.extensions.code) {
            case 'UNAUTHENTICATED':
            return promiseToObservable(onRefreshToken(cli, operation)).flatMap(() => forward(operation));
              
            default:
              break;
          }
        }
      }
    }
  );

export const cli = new ApolloClient({
    link: from([errorLink, apolloMiddleware, createHttpLink({uri: 'http://localhost:5000/graphql'})]),
    cache: new InMemoryCache()
  });