

export const getAllFriends = async (uid, token) => {
    try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/friend/${uid}`, {
            method: 'GET',
            headers: {
              'authorization': token,
            }
          });
        const jsonData = await response.json()
        return jsonData.data.rows
    } catch (err) {
        // console.log("error")
        // console.error(err.message);
    }
}