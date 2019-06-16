import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { StoreProvider } from "./StoreProvider";

export const RequireAuthProvider: React.FC = observer(({children}): JSX.Element => {
    const store = useContext(StoreProvider);
    if (!store.token) {
        return <div>Access Denied</div>;
    } else {
        return <>{children}</>;
    }
});
