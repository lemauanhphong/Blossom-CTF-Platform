import Problem from "./Problem";
import { getChallenges } from "../api/Admin";
import { useEffect, useState } from "react";
interface Problem {
    _id: string;
    flag: string;
    content: string;
    category: string;
    files: [];
    score: number;
    name: string;
}
const SAMPLE_CHALLENGE: Problem = {
    _id: "",
    flag: "",
    content: "",
    category: "",
    files: [],
    score: 0,
    name: "",
};
export default () => {
    const [challenges, setChallenges] = useState([]);
    useEffect(() => {
        (async () => {
            setChallenges(await getChallenges());
        })();
    }, []);
    // console.log(challenges);
    const completed_challenges: Problem[] = [...challenges, SAMPLE_CHALLENGE];
    return (
        <>
            {completed_challenges.map((challenge: Problem) => (
                <Problem challenge={challenge} key={challenge._id} />
            ))}
        </>
    );
};
