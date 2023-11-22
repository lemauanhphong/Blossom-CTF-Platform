// import ListGroup from "./components/ListGroup";
// import Challenges from "./components/Challenges";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Scoreboard from "./pages/Scoreboard";
import Login from "./pages/Login";
import Challenges from "./pages/Challenges";

function App() {
    // let items = [];

    // const handleSelectItem = (item: string) => {
    //     console.log(item);
    // };

    // return <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} />;
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    let isAdmin = localStorage.getItem("isAdmin");
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
                        }
                    />
                    <Route path="/register" element={<Register />} />
                    <Route path="/scoreboard" element={<Scoreboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/challenges"
                        element={
                            <Challenges
                                isLoggedIn={isLoggedIn}
                                isAdmin={isAdmin}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
