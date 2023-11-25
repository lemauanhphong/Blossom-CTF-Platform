import { request } from "../utils";
export const getChallenges = async () => {
    return (await request("GET", "/admin/challs")).data;
};
export const addChallenge = async (challenge: any) => {
    console.log(challenge);
    return (await request("POST", "/admin/challs", challenge)).data;
};
export const updateChallenge = async (challenge: any) => {
    console.log(challenge);
    return (await request("PATCH", "/admin/challs", challenge)).data;
};
export const deleteChallenge = async (_id: string) => {
    return (await request("DELETE", "/admin/challs", { _id: _id })).data;
};
