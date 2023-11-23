import { request } from "../utils";

export const getCategoris = async () => {
    const resp = await request("GET", "/categories");
    // console.log(resp)
    return resp.data;
};

export const getChallenges = async () => {
    const resp = await request("GET", "/challs");
    // console.log(resp)
    return resp.data;
};
