import { request } from "../utils";
export const privateProfile = async () => {
    return (await request("GET", "/profile")).data;
};
export const publicProfile = async (id: string) => {
    return (await request("GET", "/profile" + id)).data;
};
export const changePassword = async (
    currentPassword: string,
    newPassword: string
) => {
    return (
        await request("POST", "/change_password", {
            password: currentPassword,
            new_password: newPassword,
        })
    ).data;
};
