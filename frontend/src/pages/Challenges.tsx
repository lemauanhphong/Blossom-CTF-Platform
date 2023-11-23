import { useEffect, useState } from "react";
import { getCategoris, getChallenges } from "../api/Challenges";
import Categories from "../components/Categories";
import Challenges from "../components/Challenges";
import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";

interface Props {
    isLoggedIn: string | null;
    isAdmin: string | null;
}

interface Challenge {
    name: string;
    category: string;
    content: string;
    score: number;
    solves: number;
    solved?: boolean;
    files: { fileid: string; filename: string }[];
}

export default ({ isLoggedIn, isAdmin }: Props) => {
    // let categories = [
    //     {
    //         name: "Web",
    //         total: 12,
    //         solved: 10,
    //     },
    //     {
    //         name: "Pwn",
    //         total: 15,
    //         solved: 1,
    //     },
    // ];
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let fetchCategoris = async () => {
            let cat = await getCategoris();
            setCategories(cat);
        };

        fetchCategoris();
    }, []);
    // let categories = async () => getCategoris();

    // let challenges = [
    //     {
    //         name: "miniwaf1",
    //         category: "web",
    //         content: "bypass it",
    //         score: 100,
    //         solves: 10,
    //         solved: false,
    //         files: [{ fileid: "asd", filename: "hehe.zip" }],
    //     },
    //     {
    //         name: "bigwaf5",
    //         content: "bypass them",
    //         category: "misc",
    //         score: 500,
    //         solves: 1,
    //         solved: true,
    //         files: [{ fileid: "asdasd", filename: "hehe.zip" }],
    //     },
    // ].sort((a, b) => (a.solved === b.solved ? 0 : a.solved ? 1 : -1));
    const [filters, setFilters] = useState(new Set<string>());
    const [challenges, setChallenges] = useState([]);
    useEffect(() => {
        let fetchChallenges = async () => {
            let chall = await getChallenges();
            chall.sort((a: Challenge, b: Challenge) =>
                a.solved === b.solved ? 0 : a.solved ? 1 : -1
            );

            chall =
                filters.size === 0
                    ? chall
                    : chall.filter((c: Challenge) => filters.has(c.category));

            setChallenges(chall);
        };

        fetchChallenges();
    }, [filters]);

    const updateFilters = (checked: boolean, categoryFilter: string) => {
        if (checked) {
            setFilters((prev) => {
                return new Set(prev).add(categoryFilter);
            });
        } else {
            setFilters((prev) => {
                let newSet = new Set(prev);
                newSet.delete(categoryFilter);
                return newSet;
            });
        }
    };

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
                            handleOnChange={updateFilters}
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
