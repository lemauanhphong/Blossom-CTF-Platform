// import ListGroup from "./components/ListGroup";
// import Challenges from "./components/Challenges";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Scoreboard from "./pages/Scoreboard";
import Login from "./pages/Login";
import Challenges from "./pages/Challenges";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import "./App.css";
import Logout from "./pages/Logout";
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
                    <Route
                        path="/register"
                        element={
                            isLoggedIn ? <Navigate to="/" /> : <Register />
                        }
                    />
                    <Route
                        path="/login"
                        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
                    />
                    <Route path="/scoreboard" element={<Scoreboard />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route
                        path="/challenges"
                        element={
                            <Challenges
                                isLoggedIn={isLoggedIn}
                                isAdmin={isAdmin}
                            />
                        }
                    />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
