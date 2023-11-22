// import ListGroup from "./components/ListGroup";
// import Challenges from "./components/Challenges";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Scoreboard from "./pages/Scoreboard";
import Login from "./pages/Login";
import Challenges from "./pages/Challenges";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import "./App.css";
function App() {
    // let items = [];

    // const handleSelectItem = (item: string) => {
    //     console.log(item);
    // };

    // return <ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} />;

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/scoreboard" element={<Scoreboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
