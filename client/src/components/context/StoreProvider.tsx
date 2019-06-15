import React from 'react'

interface IState {
    authentication: {
        token: string
    }
}

interface IAction {
    type: string;
    payload: any;
}

const initialState: IState = {
    authentication: {
        token: window.sessionStorage.getItem('token')!
    }
};

const StoreContext = React.createContext<IState | any>(initialState);

function reducer(state: IState, action: IAction) {
    switch (action.type) {
        case 'SET_TOKEN':
            state.authentication.token = action.payload;
            window.sessionStorage.setItem('token', action.payload);
            return state;
        default:
            return state;
    }
}

export const StoreProvider: React.FC = (props): JSX.Element => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{state, dispatch}}>{props.children}</StoreContext.Provider>
    );
};

export const useStore = () => React.useContext(StoreContext);
