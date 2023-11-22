import Challenges from "../components/Challenges";
import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";

export default () => {
    const isLoggedIn = false;
    const isAdmin = false;

    return (
        <>
            <NavBar items={navBarItems(isLoggedIn, isAdmin)} selectedIndex={2} />
            <Challenges />
        </>
    );
};
