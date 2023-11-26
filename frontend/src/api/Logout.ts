import { request } from "../utils";

export const logout = async () => {
    await request("GET", "/logout");
};
