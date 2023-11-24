import Problem from "./Problem";
import { getChallenges } from "../api/Admin";
import { useEffect, useState } from "react";
export default () => {
    const [challenges, setChallenges] = useState([]);
    useEffect(() => {
        (async () => {
            const all_challenges = await getChallenges();
            setChallenges(all_challenges);
        })();
    }, []);
    // console.log(challenges);

    return (
        <>
            {challenges.map((problem, index) => (
                <Problem challenge={problem} key={index} />
            ))}
        </>
    );
};
