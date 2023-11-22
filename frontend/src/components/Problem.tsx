export default () => {
    return (
        <div className="row m-3">
            <div className="col-10 rounded bg-rctf text-light offset-1 p-3">
                <form>
                    <div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    className="mb-2 input-group input-group-text bg-dark text-light"
                                    autoComplete="off"
                                    placeholder="Category"
                                />
                                <input
                                    className="mb-2 input-group input-group-text bg-dark text-light"
                                    autoComplete="off"
                                    placeholder="Problem name"
                                />
                            </div>

                            <div className="col-6 align-items-center">
                                <input
                                    className="mb-2 input-group input-group-text bg-dark text-light"
                                    autoComplete="off"
                                    placeholder="Author"
                                />
                                <input
                                    className="mb-2 input-group input-group-text bg-dark text-light"
                                    autoComplete="off"
                                    type="number"
                                    placeholder="Points"
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
                        ></textarea>
                        <div className="">
                            <input
                                className="input-group input-group-text bg-dark text-light mb-3 text-start"
                                autoComplete="off"
                                placeholder="Flag"
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                className="input-group input-group-text bg-dark text-light text-start mb-3"
                            />
                        </div>
                    </div>
                </form>
                <div className=" justify-content-between d-flex">
                    <button className="btn btn-info btn-md">Update</button>
                    <button className="btn btn-danger btn-md"> Delete</button>
                </div>
            </div>
        </div>
    );
};
