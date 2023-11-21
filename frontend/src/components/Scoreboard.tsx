import NavBar from "./NavBar";
import { navBarItems } from "../utils";

export default () => {
  let teams = [
    {
      name: "O.W.C.A",
      points: 1337,
    },
    {
      name: "O.W.C.A",
      points: 1337,
    },
    {
      name: "O.W.C.A",
      points: 1337,
    },
    {
      name: "O.W.C.A",
      points: 1337,
    },
    {
      name: "O.W.C.A",
      points: 1337,
    },
  ];
  return (
    <>
      <NavBar items={navBarItems[true]} selectedIndex={1} />
      <div className="container">
        <div className="row">
          <div
            className="col-10 offset-1 rounded"
            style={{ backgroundColor: "#222" }}
          >
            <table className="table table-hover table-dark mt-3">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-start">Team</th>
                  <th className="text-center">Points</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-start">
                      <a href="#">{team.name}</a>
                    </td>
                    <td className="text-center">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
