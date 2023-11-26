import NavBar from "../components/NavBar";
import { navBarItems } from "../utils";

interface Props {
    isLoggedIn: string | null;
    isAdmin: string | null;
}

export default ({ isLoggedIn, isAdmin }: Props) => {
    return (
        <>
            <NavBar
                items={navBarItems(isLoggedIn, isAdmin)}
                selectedIndex={0}
            />

            <div className="container mt-5">
                <div className="row mb-5">
                    <div className="col-8 offset-2 text-light">
                        🌼 blossomCTF is an annual CTF Challenge categories
                        include Web Exploitaion, Pwn, Cryptography and Reverse
                        Engineering.
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-8 offset-2 text-light">
                        Join our{" "}
                        <a
                            className="fw-bold"
                            href="https://discord.gg/yrsMYHQK"
                        >
                            Discord
                        </a>{" "}
                        server!
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div
                        className="col-2 rounded hover-zoom"
                        style={{ backgroundColor: "#222222" }}
                    >
                        <a href={isLoggedIn ? "/challenges" : "/register"}>
                            <h2 className="text-light text-center fw-bold p-3">
                                {isLoggedIn ? "Challenges ➡️" : "Register Now ➡️"}
                            </h2>
                        </a>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-8 offset-2 text-light"></div>
                </div>
                <div className="row mb-5">
                    <div className="col-8 offset-2 text-light">
                        <h2 className="fw-bold display-6">Prizes</h2>
                        <div className="mb-3">
                            1st Place - 1 year free BunBo 🍜
                        </div>
                        <div className="mb-3">
                            2st Place - 1 year free BoBa 🧋
                        </div>
                    </div>
                </div>

                <div className="row mb-5">
                    <div className="col-8 offset-2 text-light">
                        <h2 className="fw-bold display-6">Sponsors</h2>

                        <div className="row">
                            <div
                                className="col-5 rounded"
                                style={{ backgroundColor: "#222222" }}
                            >
                                <div className="mx-4 my-3">
                                    <div
                                        className="rounded"
                                        style={{ backgroundColor: "white" }}
                                    >
                                        <img
                                            className="rounded img-fluid p-3"
                                            src="bunbo.jpg"
                                        ></img>
                                    </div>

                                    <div className="mt-4">
                                        {" "}
                                        <div className="fw-bold">
                                            <a href="#">blossom BunBo</a>
                                        </div>{" "}
                                        focuses on how to cook the most perfect
                                        BunBo in the world!!{" "}
                                    </div>
                                </div>
                            </div>

                            <div
                                className="offset-1 col-5 rounded"
                                style={{ backgroundColor: "#222222" }}
                            >
                                <div className="mx-4 my-3">
                                    <div
                                        className="rounded"
                                        style={{ backgroundColor: "white" }}
                                    >
                                        <img
                                            className="rounded img-fluid p-3"
                                            src="boba.jpeg"
                                        ></img>
                                    </div>

                                    <div className="mt-4">
                                        {" "}
                                        <div className="fw-bold">
                                            <a href="#">blossom BoBa</a>
                                        </div>{" "}
                                        focuses on how to make the most perfect
                                        BoBa in the world!!{" "}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
