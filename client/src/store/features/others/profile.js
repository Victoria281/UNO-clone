//@ts-nocheck
export const getUser = async (uid) => {
    try {
        const response = await fetch(
            process.env.REACT_APP_API_URL + `/api/uno/user/${uid}`, {
            method: 'GET',
            headers: {
                'authorization': localStorage.getItem('token'),
            }
        }
        );
        console.log(response)
        const jsonData = await response.json();
        var userInformation = jsonData.user;
        return userInformation;
    } catch (err) {
        console.error(err.message);
    }
};

export const updateUser = async (uid, newusername, newemail) => {
    try {
        await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/updateinfo/${uid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                username: newusername,
                email: newemail
            })
        })
    }
    catch (err) {
        console.error(err.message);
    }
};

export const updateUserProfilePic = async (uid, selectedIcon) => {
    try {
        await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/icon/${uid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
              icon: selectedIcon
            })
          })
    }
    catch (err) {
        console.error(err.message);
    }
};

export const updateUserPassword = async (uid, oldpassword, newpassword) => {
    try {
        await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/update/${uid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
                old_password: oldpassword,
                new_password: newpassword
            })
        })
    }
    catch (err) {
        console.error(err.message);
    }
};