import { request } from "../utils";
import Swal from "sweetalert2";

export const register = async (username: string, password: string) => {
    const resp = await request("POST", "/register", { username, password });
    if (resp?.status === 200) {
        await Swal.fire({
            icon: "success",
            title: "Welcome",
            text: resp.data.msg,
            showConfirmButton: false,
            timer: 1500,
            footer: "🌼blossomCTF",
        });
        return true;
    } else {
        await Swal.fire({
            showConfirmButton: false,
            icon: "error",
            title: "Oops...",
            text: resp.data.msg,
            timer: 1500,
            footer: "🌼blossomCTF",
        });
        return false;
    }
};
