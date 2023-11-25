import { memo } from "react";

interface Props {
    solves: { uid: string; time: string; username: string }[];
}

export default memo(({ solves }: Props) => {
    return (
        <div id="solvesModal" className="modal fade" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-scrollable">
                <div
                    className="modal-content"
                    style={{ backgroundColor: "#222222" }}
                >
                    <div className="modal-header fw-bold">{solves.length} solves</div>
                    <div className="modal-body">
                        <table className="table table-hover table-dark">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-start px-5">Team</th>
                                    <th className="text-center">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {solves.map((solve, index) => (
                                    <tr key={solve.uid}>
                                        <td className="text-center">
                                            {index + 1}
                                        </td>
                                        <td className="text-start px-5">
                                            <a href={`/profile/${solve.uid}`}>
                                                {solve.username.slice(0, 20) +
                                                    (solve.username.length > 20
                                                        ? "..."
                                                        : "")}
                                            </a>
                                        </td>
                                        <td className="text-center">
                                            {solve.time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});
