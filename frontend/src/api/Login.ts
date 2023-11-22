import { request } from "../utils";

export const login = async (username: string, password: string) => {
    const resp = await request("POST", "/login", { username, password });
    if (resp.msg === "Logged in") localStorage.setItem("isLoggedIn", "1");
    if (resp.role === "admin") localStorage.setItem("isAdmin", "1");
};
