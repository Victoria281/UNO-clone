// @ts-nocheck
import { useEffect, useState } from "react";
import { Box, Typography, Button } from '@mui/material';

import styles from './styles.module.css';

const Friends = () => {
  const [friendsList, setFriendsList] = useState([]);

  const getFriends = async () => {
    try {
      const uid = localStorage.getItem('userid');
      const token = localStorage.getItem('token');
      const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/friend/${uid}`, {
        method: 'GET',
        headers: {
          'authorization': token,
        }
      });
      // console.log(response);

      const jsonData = await response.json();
      var friendsList = jsonData.data.rows;

      console.log("Friends", friendsList);
      setFriendsList(friendsList);

    } catch (err) {
      console.error("error retrieving friends:", err);
    }

  };

  useEffect(() => {
    getFriends();
  }, []);

  const uid = localStorage.getItem('userid');
  const token = localStorage.getItem('token');
  let userid = 0;

  if (uid !== null) {
    userid = parseInt(uid);
  }


  const handleRemoveFriend = async (friendId, index) => {
    const data = {
      uid: uid,
      fid: friendId,
    };

    const response = await fetch(process.env.REACT_APP_API_URL + "/api/uno/user/friend", {
      method: "DELETE",
      headers: {
        'authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    console.log("data:", responseData);

    if (responseData.statusCode === 200) {
      console.log("Friend Deleted");
      document.getElementById("friendRow" + index).remove();

    } else {
      console.log("Friend not found!");
    }
  };

  return (
    <Box className="row no-gutters">
      <Box className="col-xl-12">
        {
          friendsList.length <= 0 ?
            <Box className={`row no-gutters`}>
              <Box className="col=xl=12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Typography textAlign={'center'}>You have no friends on UNO right now!</Typography>
              </Box>
            </Box>
            :
            friendsList.map(
              /**
               * 
               * @param {{userid: Number, username: String, email: String, profileicon: String}} friend 
               * @param {Number} index 
               */
              (friend, index) => {
                // console.log("index: ", index);

                return (
                  <Box id={"friendRow" + index} key={friend.userid} className={`row no-gutters`}>
                    <Box className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3"></Box>
                    <Box className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                      <Box className={`row no-gutters ${styles.friendsBody}`}>
                        <Box className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></Box>
                        <Box className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                          <img className={styles.friendsAvatar} src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + friend.profileicon + ".png"} alt={friend.profileicon}></img>
                        </Box>
                        <Box className={`col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 ${styles.friendsName}`}>
                          <Typography align="left">{friend.username}</Typography>
                        </Box>
                        <Box className={`col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2`}>
                          <Button id={friend.userid.toString()} onClick={() => handleRemoveFriend(friend.userid, index)}>Remove</Button>
                        </Box>
                        <Box className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></Box>
                      </Box>
                    </Box>
                    <Box className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3"></Box>
                  </Box>
                )
              }
            )
        }
      </Box>
    </Box>
  );
}

export default Friends;