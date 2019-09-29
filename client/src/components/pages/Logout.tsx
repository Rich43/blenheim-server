import React, { useContext } from 'react';
import useReactRouter from 'use-react-router';
import { StoreProvider } from '../../StoreProvider';

export const Logout: React.FC = (): JSX.Element => {
    const { history } = useReactRouter();
    const store = useContext(StoreProvider);
    store.user = '';
    store.token = '';
    history.push('/');
    return (<></>);
};