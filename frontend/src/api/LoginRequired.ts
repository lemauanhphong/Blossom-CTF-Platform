import Swal from "sweetalert2";
import { request } from "../utils";

export const loginRequired = async () => {
    const resp = await request("GET", "/categories");
    if (resp.status === 401 && resp.data.msg === "Please login first") {
        await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: resp.data.msg,
            showConfirmButton: false,
            timer: 1500,
            footer: "🌼blossomCTF",
        });
        window.location.href = "/logout";
    }
};
