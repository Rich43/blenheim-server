import React from 'react';
import { Login } from "./components/Login";
import { client } from "./graphQL";
import ApolloProvider from "react-apollo/ApolloProvider";

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <Login />
        </ApolloProvider>
    );
}

export default App;
