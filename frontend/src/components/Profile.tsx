import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { privateProfile, publicProfile, changePassword } from "../api/Profile";
import Swal from "sweetalert2";
interface Profile {
    _id: string;
    username: string;
    score: number;
    solved: SolveChallenge[];
    rank: number;
}
interface SolveChallenge {
    category: string;
    challenge: string;
    score: number;
    time: string;
}
const placementString = (placement: number) => {
    if (placement == 0)
        return "Unranked";
    let placementStr = String(placement);
    if (placement >= 11 && placement <= 13) {
        placementStr += "th place";
    } else {
        switch (placement % 10) {
            case 1:
                placementStr += "st place";
                break;
            case 2:
                placementStr += "nd place";
                break;
            case 3:
                placementStr += "rd place";
                break;
            default:
                placementStr += "th place";
        }
    }
    return placementStr;
};
export default () => {
    const { pathname } = useLocation();
    const id = pathname.split("/profile")[1];

    const [data, setData] = useState<Profile>({
        _id: "",
        username: "",
        score: 0,
        solved: [],
        rank: Infinity,
    });
    const getPrivateProfile = async () => {
        setData(await privateProfile());
    };
    const getPublicProfile = async () => {
        setData(await publicProfile(id));
    };
    if (id === "") {
        useEffect(() => {
            getPrivateProfile();
        }, []);
    } else {
        useEffect(() => {
            getPublicProfile();
        }, []);
    }

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleChangePassword = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
        const response = await changePassword(currentPassword, newPassword);
        if (response.msg == "Password changed successfully") {
            await Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Password changed",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            await Swal.fire({
                position: "top-end",
                icon: "error",
                title: response.msg,
                showConfirmButton: false,
                timer: 1500,
            });
        }
        setCurrentPassword("");
        setNewPassword("");
    };
    return id == "" ? (
        <div className="row">
            <div className="col-5 offset-1">
                <div className="card">
                    <div className="content text-light">
                        <p className="fw-semibold">Update Information</p>
                        <p>Change your info</p>
                        <div className="row">
                            <form className="form-group">
                                <div className="input-group border border-light rounded mb-3">
                                    <div className="input-group-text bg-rctf ">
                                        🗝️
                                    </div>
                                    <input
                                        className="form-control text-light custom-color-999999-placeholder bg-rctf"
                                        type="password"
                                        required
                                        placeholder="Old password"
                                        value={currentPassword}
                                        onChange={(e) => {
                                            setCurrentPassword(e.target.value);
                                        }}
                                    ></input>
                                </div>

                                <div className="input-group border border-light rounded mb-3 ">
                                    <div className="input-group-text bg-rctf">
                                        🆕
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="form-control text-light custom-color-999999-placeholder bg-rctf"
                                        placeholder="New password"
                                        value={newPassword}
                                        onChange={(e) => {
                                            setNewPassword(e.target.value);
                                        }}
                                    ></input>
                                </div>
                                <div className=" text-end">
                                    <button
                                        className="btn btn-info btn-md"
                                        onClick={handleChangePassword}
                                    >
                                        Change password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-5">
                <div className="card">
                    <div className="content text-light pt-3 pb-1 fw-semibold">
                        <div className="">
                            <h5>{data.username}</h5>
                        </div>
                        <div className="action-bar">
                            <p>
                                <span className="me-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-trophy-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935" />
                                    </svg>
                                </span>
                                {data.score === 0
                                    ? "No points earned"
                                    : data.score + " pts"}
                            </p>
                            <p>
                                <span className="me-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-bar-chart-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                                    </svg>
                                </span>
                                {placementString(data.rank)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="content text-light text-center">
                        {data.solved.length === 0 ? (
                            <h5 className="mt-4 mb-4 p-2">
                                This team has no solves
                            </h5>
                        ) : (
                            <div className="">
                                <h5 className="card-title mt-4 mb-4">Solves</h5>
                                <div className="col-12 rounded ">
                                    <table className="table table-hover table-dark mt-3 ">
                                        <thead>
                                            <tr>
                                                <th className="text-center">
                                                    Category
                                                </th>
                                                <th className="text-start">
                                                    Challenge
                                                </th>
                                                <th className="text-center">
                                                    Solve time
                                                </th>
                                                <th className="text-center">
                                                    Points
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.solved.map((solve, index) => (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        {solve.category}
                                                    </td>
                                                    <td className="text-start">
                                                        {solve.challenge}
                                                    </td>
                                                    <td className="text-center">
                                                        {solve.time}
                                                    </td>
                                                    <td className="text-center">
                                                        {solve.score}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            <div className="card col-6 offset-3">
                <div className="content text-light pt-3 pb-1 fw-semibold">
                    <div className="">
                        <h5>{data.username}</h5>
                    </div>
                    <div className="action-bar">
                        <p>
                            <span className="me-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-trophy-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5m.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935" />
                                </svg>
                            </span>
                            {data.score === 0
                                ? "No points earned"
                                : data.score + " pts"}
                        </p>
                        <p>
                            <span className="me-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-bar-chart-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                                </svg>
                            </span>
                            {placementString(data.rank)}
                        </p>
                    </div>
                </div>
            </div>

            <div className="card col-10 offset-1">
                <div className="text-light text-center">
                    {data.solved.length === 0 ? (
                        <h5 className="mt-4 mb-4 p-2">
                            This team has no solves
                        </h5>
                    ) : (
                        <div className="card">
                            <h5 className="text-light card-title mt-4 mb-4">
                                Solves
                            </h5>
                            <div className="col-12 rounded ">
                                <table className="table table-hover table-dark mt-3 col-12 table-borderless">
                                    <thead>
                                        <tr>
                                            <th className="text-center">
                                                Category
                                            </th>
                                            <th className="text-center">
                                                Challenge
                                            </th>
                                            <th className="text-center">
                                                Solve time
                                            </th>
                                            <th className="text-center">
                                                Points
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className=" border-top">
                                        {data.solved.map((solve, index) => (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    {solve.category}
                                                </td>
                                                <td className="text-center">
                                                    {solve.challenge}
                                                </td>
                                                <td className="text-center">
                                                    {solve.time}
                                                </td>
                                                <td className="text-center">
                                                    {solve.score}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
