import React from "react";
import { useAuth } from "./AuthProvider";

export const RequireAuthProvider: React.FC = ({children}) => {
    const auth = useAuth();
    if (auth.token === '') {
        return <div>Access Denied</div>;
    } else {
        return <>{children}</>;
    }
};
