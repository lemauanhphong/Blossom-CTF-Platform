import { request } from "../utils";
import Swal from "sweetalert2";
export const getScoreboard = async () =>
{
    const response = await request("GET","/scores");
    // console.log(response);

    if (response.status === 200)
    {   
        return response;
    }
    else
    {
        await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.msg,
            showConfirmButton: false,
            timer: 1500,
            footer: "🌼blossomCTF",
        });
    }
    return response;

}