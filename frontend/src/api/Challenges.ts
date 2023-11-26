import { request } from "../utils";

export const getCategoris = async () => {
    const resp = await request("GET", "/categories");
    return resp.data;
};

export const getChallenges = async () => {
    const resp = await request("GET", "/challs");
    return resp.data;
};
