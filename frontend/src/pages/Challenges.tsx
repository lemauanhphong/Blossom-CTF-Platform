import Categories from "../components/Categories";
import Challenges from "../components/Challenges";
import Files from "../components/Files";
import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";

interface Props {
    isLoggedIn: string | null;
    isAdmin: string | null;
}

export default ({ isLoggedIn, isAdmin }: Props) => {
    let categories = [
        {
            name: "Web",
            total: 12,
            solved: 10,
        },
        {
            name: "Pwn",
            total: 15,
            solved: 1,
        },
    ];

    let challenges = [
        {
            name: "miniwaf1",
            category: "web",
            content: "bypass it",
            score: 100,
            solves: 10,
            solved: false,
            files: [{ fileid: "asd", filename: "hehe.zip" }],
        },
        {
            name: "bigwaf5",
            content: "bypass them",
            category: "misc",
            score: 500,
            solves: 1,
            solved: true,
            files: [{ fileid: "asdasd", filename: "hehe.zip" }],
        },
    ].sort((a, b) => (a.solved === b.solved ? 0 : a.solved ? 1 : -1));

    return (
        <>
            <NavBar
                items={navBarItems(isLoggedIn, isAdmin)}
                selectedIndex={2}
            />
            <div className="container">
                <div className="row">
                    <div className="offset-1 col-3">
                        <Categories
                            categories={categories}
                            isLoggedIn={isLoggedIn}
                        />
                    </div>

                    <div className="col-7">
                        <Challenges challenges={challenges} />
                    </div>
                </div>
            </div>
        </>
    );
};
