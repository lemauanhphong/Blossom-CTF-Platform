import { FormEvent, useEffect, useState } from "react";
import { getCategoris, getChallenges } from "../api/Challenges";
import Categories from "../components/Categories";
import Challenges from "../components/Challenges";
import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";
import { submitFlag } from "../api/SubmitFlag";

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
    const [filters, setFilters] = useState(new Set<string>());
    const [challenges, setChallenges] = useState([]);
    const [rerenderSwitch, setRerenderSwitch] = useState(0);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let fetchCategoris = async () => {
            let cat = await getCategoris();
            setCategories(cat);
        };

        fetchCategoris();
    }, [rerenderSwitch]);
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
    }, [rerenderSwitch]);

    const updateFilters = (checked: boolean, categoryFilter: string) => {
        if (checked) {
            setFilters((prev) => {
                return prev.add(categoryFilter);
            });
            setRerenderSwitch(rerenderSwitch ^ 1);
        } else {
            setFilters((prev) => {
                prev.delete(categoryFilter);
                return prev;
            });
            setRerenderSwitch(rerenderSwitch ^ 1);
        }
    };

    const updateChallengesState = async (e: FormEvent, name: string) => {
        e.preventDefault();
        const isSuccessFlag = await submitFlag(
            name,
            ((e.target as HTMLFormElement)[0] as HTMLInputElement).value
        );
        if (isSuccessFlag) setRerenderSwitch(rerenderSwitch ^ 1);
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
                        <Challenges
                            handleOnSubmit={updateChallengesState}
                            challenges={challenges}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
