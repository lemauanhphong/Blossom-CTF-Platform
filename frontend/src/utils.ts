import { backend } from "./config";

export const navBarItems = (
    isLoggedIn?: string | null,
    isAdmin?: string | null
) => {
    if (!isLoggedIn)
        return [
            { name: "🌼Home", route: "/" },
            { name: "Scoreboard", route: "/scoreboard" },
            { name: "Challenges", route: "/challenges" },
            { name: "Register", route: "/register" },
            { name: "Login", route: "/login" },
        ];

    if (isAdmin)
        return [
            { name: "🌼Home", route: "/" },
            { name: "Scoreboard", route: "/scoreboard" },
            { name: "Challenges", route: "/challenges" },
            { name: "Profile", route: "/profile" },
            { name: "Admin", route: "/admin" },
            { name: "Logout", route: "/logout" },
        ];

    return [
        { name: "🌼Home", route: "/" },
        { name: "Scoreboard", route: "/scoreboard" },
        { name: "Challenges", route: "/challenges" },
        { name: "Profile", route: "/profile" },
        { name: "Logout", route: "/logout" },
    ];
};

type StringStringObject = {
    [key: string]: string;
};

export const request = async (
    method: string,
    endpoint: string,
    body?: StringStringObject,
    headers?: StringStringObject
) => {
    if (!headers) headers = {};
    if (!body) body = {};
    try {
        let resp;
        if (method !== "HEAD" && method !== "GET") {
            resp = await fetch(`${backend}${endpoint}`, {
                method,
                headers: { "Content-Type": "application/json", ...headers },
                body: JSON.stringify(body),
                credentials: "include",
            });
        } else {
            resp = await fetch(`${backend}${endpoint}`, {
                method,
                headers,
                credentials: "include",
            });
        }

        let data;
        try {
            data = await resp.json();
        } catch (e) {
            data = { msg: "Error occured! Please try again" };
        }

        return { status: resp.status, data };
    } catch (e) {
        console.log("Error in fetching API ", method, headers, body, e);
        return {
            status: 500,
            data: { msg: "Error occured! Please try again" },
        };
    }
};
