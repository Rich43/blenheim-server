import React from "react";
import { useStore } from "./StoreProvider";

export const RequireAuthProvider: React.FC = ({children}) => {
    const auth = useStore();
    if (auth.token === '') {
        return <div>Access Denied</div>;
    } else {
        return <>{children}</>;
    }
};
