import axios from "axios"

const TrackUserVisitsApi = async() => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_UTIL_SERVER_2_URI}/activity/`)
        return response.data
}
export const TrackUserProfileVisitsApi = async(userid:string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_UTIL_SERVER_2_URI}/activity/profile/${userid}`)
    return response.data
}
export const TrackUserResourceVisitsApi = async(resourceid:string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_UTIL_SERVER_2_URI}/activity/resource/${resourceid}`)
    return response.data

}
export default TrackUserVisitsApi