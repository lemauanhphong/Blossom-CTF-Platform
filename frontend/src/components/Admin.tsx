import Problem from "./Problem";
import { getChallenges, updateChallenge } from "../api/Admin";
import { useCallback, useEffect, useState } from "react";
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
    const fetchChallenges = async () => {
        setChallenges(await getChallenges());
    };
    useEffect(() => {
        fetchChallenges();
    }, []);
    let completed_challenges: Problem[] = [...challenges, SAMPLE_CHALLENGE];
    const update = useCallback(() => {
        fetchChallenges();
        completed_challenges = [...challenges, SAMPLE_CHALLENGE];
    }, [completed_challenges]);
    // console.log(challenges);

    return (
        <>
            {completed_challenges.map((challenge: Problem) => (
                <Problem
                    challenge={challenge}
                    key={challenge._id}
                    onUpdate={update}
                />
            ))}
        </>
    );
};
