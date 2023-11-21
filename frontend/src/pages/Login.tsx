import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";

export default () => {
    let isLoggedIn = false;
    return (
        <div>
            <NavBar items={navBarItems[isLoggedIn]} selectedIndex={4} />

            <div className="container">
                <div className="row mb-5">
                    <h4 className="text-light text-center fw-bold">
                        Register for blossomCTF
                    </h4>
                </div>

                <div className="row justify-content-center">
                    <div className="col-5">
                        <form className="form-group">
                            <div className="input-group border border-light rounded">
                                <div
                                    className="input-group-text"
                                    style={{ backgroundColor: "#222222" }}
                                >
                                    🧑
                                </div>
                                <input
                                    style={{ backgroundColor: "#222222" }}
                                    className="form-control text-light custom-color-999999-placeholder"
                                    placeholder="Username"
                                ></input>
                            </div>

                            <div className="input-group border border-light rounded mt-2">
                                <div
                                    className="input-group-text"
                                    style={{ backgroundColor: "#222222" }}
                                >
                                    🔑
                                </div>
                                <input
                                    type="password"
                                    style={{ backgroundColor: "#222222" }}
                                    className="form-control text-light custom-color-999999-placeholder"
                                    placeholder="Password"
                                ></input>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="mt-5 px-3 py-2 btn btn-primary"
                                >
                                    LOGIN
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
