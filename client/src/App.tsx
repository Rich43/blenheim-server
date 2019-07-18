import React from 'react';
import { Login } from './components/Login';
import { client } from './graphQL';
import ApolloProvider from 'react-apollo/ApolloProvider';
import { Home } from './components/Home';
import { RequireAuth } from './components/RequireAuth';
import { BrowserRouter, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Box } from '@material-ui/core';

export const ROOT = '/';
export const HOME = '/home';

const App: React.FC = (): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Route exact path={ROOT} component={Login} />
                <RequireAuth>
                    <Navigation />
                    <Box p={2} />
                    <Route path={HOME} component={Home} />
                </RequireAuth>
            </BrowserRouter>
        </ApolloProvider>
    );
};

export default App;
