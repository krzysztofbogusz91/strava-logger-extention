// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppStore from './reducers/reducers';

// Apollo
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { cli } from './apollo/apollo.server';


// Styles
import './index.css';
import 'fontsource-roboto';

const store = createStore(AppStore, applyMiddleware(thunk));

const client: ApolloClient<NormalizedCacheObject> = cli;

ReactDOM.render( 
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
