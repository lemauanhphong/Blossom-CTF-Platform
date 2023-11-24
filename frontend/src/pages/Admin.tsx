import Admin from "../components/Admin";
import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";
interface Props {
    isLoggedIn: string | null;
    isAdmin: string | null;
}

export default ({ isLoggedIn, isAdmin }: Props) => {
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
