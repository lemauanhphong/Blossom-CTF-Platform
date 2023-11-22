import Admin from "../components/Admin";
import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";
export default () => {
    const isLoggedIn = true;
    const isAdmin = true;
    return (
        <>
            <NavBar
                items={navBarItems(isLoggedIn, isAdmin)}
                selectedIndex={4}
            />
            <Admin />
        </>
    );
};
