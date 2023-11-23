import { FormEvent, useState } from "react";
import { register } from "../api/Register";
import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";

export default () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isSuccess = await register(username, password);
        if (isSuccess) window.location.href = "/login";
    };
    return (
        <div>
            <NavBar items={navBarItems()} selectedIndex={3} />

            <div className="container">
                <div className="d-flex justify-content-center">
                    <div className="row mb-5">
                        <h4 className="text-light fw-bold">
                            Register for blossomCTF
                        </h4>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-5">
                        <form className="form-group" onSubmit={handleSubmit}>
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
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                ></input>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="mt-5 px-3 py-2 btn btn-primary"
                                >
                                    REGISTER
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
