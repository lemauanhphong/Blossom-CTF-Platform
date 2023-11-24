import Files from "./Files";

interface Props {
    handleOnSubmit: any;
    challenges: {
        _id: string;
        name: string;
        category: string;
        content: string;
        score: number;
        solves: number;
        solved?: boolean;
        files: { fileid: string; filename: string }[];
    }[];
}

export default ({ handleOnSubmit, challenges }: Props) => {
    return (
        <>
            {challenges.map((challenge) => (
                <div
                    key={challenge["_id"]}
                    className="rounded p-3 mb-3 text-white"
                    style={{
                        backgroundColor: "#222222",
                        backgroundImage: challenge.solved
                            ? `url("firework.png")`
                            : "",
                    }}
                >
                    <div className="row">
                        <div className="col-6 fw-bold">
                            {challenge.category}/{challenge.name}
                        </div>
                        <div className="col-6 fw-bold d-flex justify-content-end">
                            {challenge.solves} solves / {challenge.score} point
                        </div>
                    </div>
                    <div className="row">
                        <form onSubmit={(e) => handleOnSubmit(e, challenge._id)}>
                            <div className="form-handleOnSubmit">
                                <hr />
                                <div className="mb-3">{challenge.content}</div>

                                <Files files={challenge.files}></Files>

                                {challenge.solved ? (
                                    <div className="fw-bold text-center">
                                        🤯Solved! Good job
                                    </div>
                                ) : (
                                    <div className="input-group">
                                        <input
                                            {...{
                                                disabled: challenge.solved,
                                            }}
                                            className="form-control"
                                            placeholder="blossom{.+}"
                                        ></input>
                                        <button
                                            {...{
                                                disabled: challenge.solved,
                                            }}
                                            type="submit"
                                            className="btn btn-secondary btn-group"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            ))}
        </>
    );
};
