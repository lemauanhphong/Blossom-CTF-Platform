import { request } from "../utils";

export const getSolves = async (cid: string) => {
    const resp = await request("GET", `/solves/${cid}`);
    return resp.data;
};
