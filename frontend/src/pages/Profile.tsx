import Profile from "../components/Profile";
import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";

export default () => {
    const isLoggedIn = "true";
    const isAdmin = null;
    return (
        <>
            <NavBar
                items={navBarItems(isLoggedIn, isAdmin)}
                selectedIndex={3}
            />
            <Profile />
        </>
    );
};
