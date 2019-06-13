import React from 'react';
import { Login } from "./components/Login";
import { client } from "./graphQL";
import ApolloProvider from "react-apollo/ApolloProvider";
import { Home } from "./components/Home";
import { AuthProvider } from "./components/context/AuthProvider";
import { RequireAuthProvider } from "./components/context/RequireAuthProvider";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <ApolloProvider client={client}>
                <Login />
                <RequireAuthProvider>
                    <Home />
                </RequireAuthProvider>
            </ApolloProvider>
        </AuthProvider>
    );
};

export default App;
