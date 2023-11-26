import { useEffect, useState } from "react";
import { getScoreboard } from "../api/Score";
interface Score {
    _id: string;
    score: number;
    username: string;
}
export default () => {
    const [scores, setScores] = useState<Score[]>([]);
    useEffect(() => {
        (async () => {
            const response = await getScoreboard();
            setScores(response.data as Score[]); // Use type assertion to let TypeScript know the data type
        })();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div
                        className="col-10 offset-1 rounded"
                        style={{ backgroundColor: "#222" }}
                    >
                        <table className="table table-hover table-dark mt-3">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-start">Team</th>
                                    <th className="text-center">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.map((entry, index) => (
                                    <tr key={index}>
                                        <td className="text-center">
                                            {index + 1}
                                        </td>
                                        <td className="text-start">
                                            <a href={"/profile/" + entry._id}>
                                                {entry.username}
                                            </a>
                                        </td>
                                        <td className="text-center">
                                            {entry.score}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
