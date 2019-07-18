import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreProvider } from '../StoreProvider';
import { Redirect } from 'react-router';

export const RequireAuth: React.FC = observer(({ children }): JSX.Element => {
    const store = useContext(StoreProvider);
    if (store.token) {
        return <>{children}</>;
    }
    return <Redirect to='/' />;
});
