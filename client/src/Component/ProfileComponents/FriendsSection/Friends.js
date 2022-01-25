import { useEffect, useState } from "react";
import { Box, Typography, Button } from '@material-ui/core';

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
  

  const handleRemoveFriend = async (friendId) => {
    const response = await fetch(process.env.REACT_APP_API_URL + "/api/uno/friend?uid=" + uid + "&fid=" + friendId, {
      method: "DELETE",
      headers: {
        'authorization': token
      }
    });

    const data = await response.json();
    console.log("data:", data.rowCount);

    data.rowCount === 0 ?
    console.log("Friend Not Deleted!")
    :
    console.log("Friend Deleted!");
  };

  return (
    <Box className="row no-gutters">
      <Box className="col-xl-12">
        {
          friendsList.map(
            /**
             * 
             * @param {{userid: Number, username: String, email: String, profileicon: String}} friend 
             * @param {Number} index 
             */
            (friend, index) => {
              console.log("index: ", index);
              return (
                <Box key={friend.userid} className={`row no-gutters ${styles.friendsBody}`}>
                  {/* <Box className={`${styles.friendsBody}`}> */}
                  <Box className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <Box className={`row no-gutters`}>
                      <Box className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2">
                        <img className={styles.friendsAvatar} src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + friend.profileicon + ".png"} alt={friend.profileicon}></img>
                      </Box>
                      <Box className={`col-xl-10 col-lg-10 col-md-10 col-sm-10 col-xs-10 ${styles.friendsName}`}>
                        <Typography align="left">{friend.username}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <Box className={`row no-gutters`}>
                      <Box className={`col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12`}>
                        <Button id={friend.userid.toString()} onClick={() => handleRemoveFriend(friend.userid)}>Remove</Button>
                      </Box>
                    </Box>
                  </Box>
                  {/* </Box> */}

                </Box>
              );
            }
          )
        }
      </Box>
    </Box>
  );
}

export default Friends;