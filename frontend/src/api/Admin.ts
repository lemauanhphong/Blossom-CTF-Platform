import { request } from "../utils";
import Swal from "sweetalert2";
export const getChallenges = async () => {
    const response = await request('GET','/admin/challs')
    if(response.status === 200)
    {
        return response.data
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
        return response.data
    }
}
export const addChallenges = async (challenge :any) => {
    return (await request('POST','/admin/challs',
        challenge
    )).data
}

export const deleteChallenges = async (_id: string) => {
    return (await request('DELETE','/admin/challs', {_id : _id})).data
}