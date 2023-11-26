import { request } from "../utils";
import Swal from "sweetalert2";

export const submitFlag = async (_id: string, flag: string) => {
    const resp = await request("POST", "/flag", { _id, flag });
    if (resp?.status === 200) {
        await Swal.fire({
            icon: "success",
            title: "Pwned!!!",
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
