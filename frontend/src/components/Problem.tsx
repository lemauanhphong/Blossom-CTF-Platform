import { useCallback, useState } from "react";
import { backend } from "../config";
import { addChallenge, updateChallenge, deleteChallenge } from "../api/Admin";
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
    onUpdate: any;
}
interface File {
    fileid: string;
    filename: string;
}
export default ({ challenge, onUpdate }: Props) => {
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
    const [files, setFiles] = useState<File[]>(challenge.files);
    const handleRemoveFile = (file: File) => async () => {
        const newFiles = files.filter((f) => f !== file);
        setFiles(newFiles);
    };
    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        Swal.fire({
            title: "Do you want to delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Don't",
            denyButtonText: `Delete`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isDenied) {
                const response = await deleteChallenge(challenge._id);
                console.log(response);
                if (response.msg == "Challenge deleted") {
                    await Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Problem deleted",
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
                onUpdate();
            }
        });
    };
    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (challenge._id === "") {
            const response = await addChallenge({
                category: category,
                content: description,
                files: files,
                flag: flag,
                name: name,
                score: score,
            });
            console.log(response);
            if (response.msg == "Challenge added") {
                await Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Problem added successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFlag("");
                setDescription("");
                setCategory("");
                setName("");
                setScore(0);
                // setFile([]);
            } else {
                await Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: response.msg,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } else {
            const response = await updateChallenge({
                _id: challenge._id,
                category: category,
                content: description,
                files: files,
                flag: flag,
                name: name,
                score: score,
            });
            console.log(response);
            if (response.msg == "Challenge updated") {
                await Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Problem updated successfully",
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
        }
        onUpdate();
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
                        {files.length !== 0 && (
                            <div>
                                <p className="mb-0">Downloads</p>
                                <div className="container">
                                    {files.map((file: File) => {
                                        return (
                                            <div
                                                key={file.fileid}
                                                className="d-inline-flex me-2 mb-2 badge bg-black"
                                            >
                                                <a
                                                    href={`${backend}/files/${file.fileid}`}
                                                    className="fs-6"
                                                >
                                                    {file.filename}
                                                </a>
                                                <div
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                    className="p-1 ms-1 hover-zoom"
                                                    onClick={handleRemoveFile(
                                                        file
                                                    )}
                                                >
                                                    X
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
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
