import { request } from "../utils";
export const privateProfile = async () => {
    return (await request("GET", "/profile")).data;
};
