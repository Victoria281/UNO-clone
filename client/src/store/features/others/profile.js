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
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/updateinfo/${uid}`, {
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
        console.log("Response to Update")
        console.log(response)
        return response;
    }
    catch (err) {
        console.error(err.message);
    }
};

export const updateUserProfilePic = async (uid, selectedIcon) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/icon/${uid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
              icon: selectedIcon
            })
          })
          console.log("Response to Update")
          console.log(response)
    }
    catch (err) {
        console.error(err.message);
    }
};