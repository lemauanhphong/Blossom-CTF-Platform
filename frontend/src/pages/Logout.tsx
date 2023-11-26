import { useEffect } from "react";
import { logout } from "../api/Logout";

export default () => {
    useEffect(() => {
        (async () => {
            console.log("before");
            await logout();
            console.log("after");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("isAdmin");
            window.location.href = "/login";
        })();
    }, []);
    return <></>;
};
