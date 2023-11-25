import { request } from "../utils";
export const getChallenges = async () => {
    return (await request('GET','/admin/challs')).data
}
export const addChallenges = async (challenge :any) => {
    return (await request('POST','/admin/challs',
        challenge
    )).data
}

export const deleteChallenges = async (_id: string) => {
    return (await request('DELETE','/admin/challs', {_id : _id})).data
}