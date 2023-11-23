import { request } from "../utils";
import Swal from "sweetalert2";

export const login = async (username: string, password: string) => {
    const resp = await request("POST", "/login", { username, password });
    if (resp?.status === 200) {
        localStorage.setItem("isLoggedIn", "1");
        if (resp.data.role === "admin") localStorage.setItem("isAdmin", "1");
        return true;
    } else
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: resp.data.msg,
            footer: '🌼blossomCTF',
        });
        return false;
};
