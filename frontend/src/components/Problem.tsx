import { useCallback, useState } from "react";
import { addChallenge, updateChallenge } from "../api/Admin";
import Swal from "sweetalert2";
interface Problem {
    _id: string;
    flag: string;
    content: string;
    category: string;
    files: [];
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
        (e: any) => setScore(Number.parseInt(e.target.value)),
        []
    );

    const [name, setName] = useState(challenge.name);
    const handleNameChange = useCallback(
        (e: any) => setName(e.target.value),
        []
    );
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        Swal.fire({
            title: "Do you want to delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Don't",
            denyButtonText: `Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
                // const response = await deleteChallenge(challenge._id);

                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };
    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (challenge._id === "") {
            await addChallenge({
                category: category,
                content: description,
                files: [],
                flag: flag,
                name: name,
                score: score,
            });
        } else {
            const response = await updateChallenge({
                _id: challenge._id,
                category: category,
                content: description,
                files: [],
                flag: flag,
                name: name,
                score: score,
            });
            console.log(response);
            if (response.msp == "ok") {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Problem updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
            }
        }
    };
    return (
        <div className="row m-3">
            <div className="col-10 rounded bg-rctf text-light offset-1 p-3">
                <form className="form-group" onSubmit={handleUpdate}>
                    <div>
                        <div className="row">
                            <div className="col-6">
                                <input
                                    required
                                    className="mb-2 input-group input-group-text bg-dark text-light"
                                    autoComplete="off"
                                    placeholder="Category"
                                    value={category}
                                    onChange={handleCategoryChange}
                                />
                                <input
                                    required
                                    className="mb-2 input-group input-group-text bg-dark text-light"
                                    autoComplete="off"
                                    placeholder="Problem name"
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </div>

                            <div className="col-6 align-items-center">
                                <input
                                    required
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
                            style={{ height: "128px" }}
                            className=" input-group input-group-text bg-dark text-light mb-3 text-start text-wrap"
                            autoComplete="off"
                            autoCorrect="off"
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                        ></textarea>
                        <div className="">
                            <input
                                required
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
                        <button
                            className="btn btn-danger btn-md"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
