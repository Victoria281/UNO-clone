import {
    getUser,
    updateUser,
    updateUserProfilePic,
    updateUserPassword
} from "../../features/others/profile"

export const GET_USER_INFORMATION = "GET_USER_INFORMATION"
export const UPDATE_USER_INFORMATION = "UPDATE_USER_INFORMATION"
export const UPDATE_USER_PROFILEPIC = "UPDATE_USER_PROFILEPIC"
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD"

export const getUserInfo = (uid) => async dispatch => {
    getUser(uid).then((result)=>{
        dispatch({
            type: GET_USER_INFORMATION,
            result,
        });
    })
}

export const updateUserInfo = (uid, newusername, newemail) => async (dispatch, getState) => {
    updateUser(uid, newusername, newemail).then((result)=>{
        const profile_states = getState().profile_info.userInfo;
        console.log(profile_states);
        profile_states.username = newusername
        profile_states.email= newemail
        dispatch({
            type: UPDATE_USER_INFORMATION,
            profile_states
        });
    })
}

export const updateUserProfileImg = (uid,icon) => async (dispatch,getState) => {
    updateUserProfilePic(uid, icon).then((result)=>{
        const profile_state = getState().profile_info.userInfo;
        profile_state.profileicon = icon
        dispatch({
            type: UPDATE_USER_PROFILEPIC,
            profile_state
        });
    })
}
export const updateUserPasswd = (uid, oldpassword, newpassword) => async (dispatch,getState) => {
    updateUserPassword(uid, oldpassword, newpassword).then((result)=>{
        const results = getState().profile_info.userInfo
        dispatch({
            type: UPDATE_USER_PASSWORD,
            results
        });
    })
}
