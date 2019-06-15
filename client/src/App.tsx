import React from 'react';
import { Login } from "./components/Login";
import { client } from "./graphQL";
import ApolloProvider from "react-apollo/ApolloProvider";
import { Home } from "./components/Home";
import { StoreProvider } from "./components/context/StoreProvider";
import { RequireAuthProvider } from "./components/context/RequireAuthProvider";

const App: React.FC = () => {
    return (
        <StoreProvider>
            <ApolloProvider client={client}>
                <Login />
                <RequireAuthProvider>
                    <Home />
                </RequireAuthProvider>
            </ApolloProvider>
        </StoreProvider>
    );
};

export default App;
