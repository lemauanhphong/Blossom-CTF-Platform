import Challenges from "../components/Challenges";
import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";

export default () => {
    return (
        <>
            <NavBar items={navBarItems[true]} selectedIndex={2} />
            <Challenges />
        </>
    );
};
