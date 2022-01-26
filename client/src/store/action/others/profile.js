import {
    getUser,
    updateUser,
    updateUserProfilePic
} from "../../features/others/profile"

export const GET_USER_INFORMATION = "GET_USER_INFORMATION"
export const UPDATE_USER_INFORMATION = "UPDATE_USER_INFORMATION"
export const UPDATE_USER_PROFILEPIC = "UPDATE_USER_PROFILEPIC"

export const getUserInfo = (uid) => async dispatch => {
    getUser(uid).then((result)=>{
        dispatch({
            type: GET_USER_INFORMATION,
            result,
        });
    })
}

export const updateUserInfo = (uid, newusername, newemail) => async dispatch => {
    updateUser(uid, newusername, newemail).then((result)=>{
        dispatch({
            type: UPDATE_USER_INFORMATION,
            result
        });
    })
}

export const updateUserProfileImg = (uid,icon) => async dispatch => {
    updateUserProfilePic(uid, icon).then((result)=>{
        dispatch({
            type: UPDATE_USER_PROFILEPIC,
            result
        });
    })
}
