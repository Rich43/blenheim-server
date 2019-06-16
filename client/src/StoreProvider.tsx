import { createContext } from 'react';
import { computed, decorate, observable } from 'mobx';

export class Store {
    store = {
        authentication: {
            token: window.sessionStorage.getItem('token')!
        }
    };

    get token() {
        return this.store.authentication.token;
    }

    set token(value: string) {
        this.store.authentication.token = value;
        window.sessionStorage.setItem('token', value);
    }
}

decorate(Store, {
    store: observable,
    token: computed
});

export const StoreProvider = createContext(new Store());
