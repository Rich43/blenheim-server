import React from 'react';
import { Login } from "./components/Login";
import { client } from "./graphQL";
import ApolloProvider from "react-apollo/ApolloProvider";
import { Home } from "./components/Home";
import { RequireAuthProvider } from "./components/context/RequireAuthProvider";

const App: React.FC = (): JSX.Element => {
    return (
        <ApolloProvider client={client}>
            <Login />
            <RequireAuthProvider>
                <Home />
            </RequireAuthProvider>
        </ApolloProvider>
    );
};

export default App;
