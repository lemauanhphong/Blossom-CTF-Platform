export default () => {
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
            name: "miniwaf",
            category: "web",
            content: "bypass it",
            score: 100,
            solves: 10,
        },
        {
            name: "bigwaf",
            content: "bypass them",
            category: "misc",
            score: 500,
            solves: 1,
        },
        {
            name: "bigwaf",
            content: "bypass them",
            category: "misc",
            score: 500,
            solves: 1,
        },
        {
            name: "bigwaf",
            content: "bypass them",
            category: "misc",
            score: 500,
            solves: 1,
        },
        {
            name: "bigwaf",
            content: "bypass them",
            category: "misc",
            score: 500,
            solves: 1,
        },
    ];

    return (
        <>
            <div className="container">
                <div className="row">
                    <div
                        className="offset-1 col-3 rounded h-100 p-3 text-white"
                        style={{ backgroundColor: "#222222" }}
                    >
                        <div className="fw-bold">Categories</div>
                        <div className="form-check">
                            {categories.map((category) => (
                                <div key={category.name} className="m-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                    ></input>
                                    <label className="form-check-label">
                                        {category.name} ({category.solved}/
                                        {category.total})
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-7">
                        {challenges.map((challenge) => (
                            <div
                                className="rounded p-3 mb-3 text-white"
                                style={{ backgroundColor: "#222222" }}
                            >
                                <div className="row">
                                    <div className="col-6 fw-bold">
                                        {challenge.category}/{challenge.name}
                                    </div>
                                    <div className="col-6 fw-bold d-flex justify-content-end">
                                        {challenge.solves} solves /{" "}
                                        {challenge.score} point
                                    </div>
                                </div>
                                <div className="row">
                                    <form>
                                        <div className="form-group">
                                            <hr />
                                            <div className="mb-3">
                                                {challenge.content}
                                            </div>
                                            <div className="input-group">
                                                <input
                                                    className="form-control"
                                                    placeholder="blossom{.+}"
                                                ></input>
                                                <button
                                                    type="submit"
                                                    className="btn btn-secondary btn-group"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
