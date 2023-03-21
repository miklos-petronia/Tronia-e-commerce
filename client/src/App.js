// import react dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// import apollo dependencies
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import the store file
import store from './utils/store';

// import pages
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';

// create main GraphQL API endpoint
const httpLink = createHttpLink({
    uri: '/graphql',
});

// create request middleware
const authLink = setContext((_, { headers }) => {
  // get the token from local storage 
  const token = localStorage.getItem('id_token');
  // return the headers to the context
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
