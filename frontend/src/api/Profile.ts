import { request } from "../utils";
export const privateProfile = async () =>{
    const response = await request('GET','/profile')
    return response.data;
}