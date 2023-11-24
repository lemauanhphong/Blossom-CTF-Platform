import { useCallback, useState } from "react";
interface Problem {
    flag: string;
    content: string;
    category: string;
    score: number;
    name: string;
}
interface Props {
    challenge: Problem;
}
export default ({ challenge }: Props) => {
    const [flag, setFlag] = useState(challenge.flag);
    const handleFlagChange = useCallback(
        (e: any) => setFlag(e.target.value),
        []
    );

    const [description, setDescription] = useState(challenge.content);
    const handleDescriptionChange = useCallback(
        (e: any) => setDescription(e.target.value),
        []
    );

    const [category, setCategory] = useState(challenge.category);
    const handleCategoryChange = useCallback(
        (e: any) => setCategory(e.target.value),
        []
    );

    const [score, setScore] = useState(challenge.score);
    const handleScoreChange = useCallback(
        (e: any) => setScore(e.target.value),
        []
    );

    const [name, setName] = useState(challenge.name);
    const handleNameChange = useCallback(
        (e: any) => setName(e.target.value),
        []
    );
    return (
        <div className="row m-3">
            <div className="col-10 rounded bg-rctf text-light offset-1 p-3">
                <form className="form-group">
                    <div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    className="mb-2 input-group input-group-text bg-dark text-light"
                                    autoComplete="off"
                                    placeholder="Category"
                                    value={category}
                                    onChange={handleCategoryChange}
                                />
                                <input
                                    className="mb-2 input-group input-group-text bg-dark text-light"
                                    autoComplete="off"
                                    placeholder="Problem name"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>

                            <div className="col-6 align-items-center">
                                <input
                                    className="mb-2 input-group input-group-text bg-dark text-light"
                                    autoComplete="off"
                                    type="number"
                                    placeholder="Points"
                                    value={score}
                                    onChange={handleScoreChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-10 offset-1 border mb-3 mt-3"></div>
                        </div>
                        <textarea
                            className=" input-group input-group-text bg-dark text-light mb-3 text-start"
                            autoComplete="off"
                            autoCorrect="off"
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                        ></textarea>
                        <div className="">
                            <input
                                className="input-group input-group-text bg-dark text-light mb-3 text-start"
                                autoComplete="off"
                                placeholder="Flag"
                                value={flag}
                                onChange={handleFlagChange}
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                className="input-group input-group-text bg-dark text-light text-start mb-3"
                            />
                        </div>
                    </div>
                    <div className=" justify-content-between d-flex">
                        <button className="btn btn-info btn-md">Update</button>
                        <button className="btn btn-danger btn-md">
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
