export default () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    return window.location.href = '/login';
};
