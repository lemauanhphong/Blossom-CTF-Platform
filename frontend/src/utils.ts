export const navBarItems = (isLoggedIn?: boolean, isAdmin?: boolean) => {
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
