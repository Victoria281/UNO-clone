// @ts-nocheck
import { useEffect, useState } from "react";
import { Box, Typography, Button } from '@mui/material';

import styles from './styles.module.css';

const PendingFriends = () => {
  const [friendsList, setFriendsList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [pendingFR, setPendingFR] = useState([]);

  const getPendingFriends = async () => {
    let allUsersData; // Retrieve All users
    let tmpArray = []; // Retrive Friend Requests from Other People
    let tmpArray2 = []; // Retrieve Sent Friend Requests
    let pendingFRs;

    // Retrieve all users
    try {
      const findFriendsResponse = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user`, {
        method: 'GET',
      });

      allUsersData = await findFriendsResponse.json();
      setAllUsers(allUsersData);

      console.log("allUsers", allUsersData);

    } catch (error1) {
      console.error("error retrieving users:", error1);

    }

    // Retrieve friend request from other ppl
    try {
      const uid = localStorage.getItem('userid');
      const token = localStorage.getItem('token');
      const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/friend/pending/${uid}`, {
        method: 'GET',
        headers: {
          'authorization': token,
        }
      });


      try {
        const data = await response.json();
        console.log('datas :', data);
        const getRequest = data.data;

        if (getRequest === null || getRequest === undefined || getRequest.length === 0) {
          console.log("no friends dey");
        }

        console.log(">>>>>", getRequest);

        getRequest.forEach(friend => {
          let userid = parseInt(friend.split('_')[1]);
          for (let i = 0; i < allUsersData.length; i++) {
            if (allUsersData[i].userid === userid) {
              let newData = {
                userid: allUsersData[i].userid,
                username: allUsersData[i].username,
                email: allUsersData[i].email,
                profileicon: allUsersData[i].profileicon,
                origin: 'receive',
              };

              console.log("pushing data", newData);
              tmpArray.push(newData);
            }
          }
        });

        console.log("originReceive:", tmpArray);

        setFriendsList(tmpArray);

      } catch (err) {
        console.error("error retrieving friends:", err);

      }

    } catch (err) {
      console.error("error retrieving friends:", err);
    }

    // Retrieve sent friend requests
    try {
      const uid = localStorage.getItem('userid');
      const token = localStorage.getItem('token');
      const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/friend/pending/sent/${uid}`, {
        method: 'GET',
        headers: {
          'authorization': token,
        }
      });


      try {
        const data = await response.json();
        console.log('data:', data);
        const friendsList2 = data.data;

        if (friendsList2 === null || friendsList2 === undefined || friendsList2.length === 0) {
          console.log("no friends dey");
        }

        console.log("Friends2", friendsList2);

        friendsList2.forEach(friend => {
          let userid = parseInt(friend.split('_')[2]);
          console.log("userid:", userid);
          tmpArray2.push(userid);
        });

        tmpArray2.sort();
        console.log("sorted", tmpArray2);
        
        let originSent = [];
        let xy = 0;

        allUsersData.forEach(user => {
          // console.log("XYZ", user);
          // console.log(user.userid === tmpArray2[xy]);
          if (user.userid === tmpArray2[xy]) {
            let newData = {
              userid: user.userid,
              username: user.username,
              profileicon: user.profileicon,
              origin: 'sent',
            };

            originSent.push(newData);
            xy++;
          }
        });

        console.log("originSent", originSent);

        const concatSentReceive = tmpArray.concat(originSent);
        setFriendsList(concatSentReceive);
        setPendingFR(concatSentReceive);

      } catch (err) {
        console.error("error retrieving friends:", err);

      }

    } catch (err) {
      console.error("error retrieving friends:", err);
    }

  };

  useEffect(() => {
    getPendingFriends();
  }, []);

  let uid = localStorage.getItem('userid');

  if (uid !== null) {
    uid = parseInt(uid);
  }

  const denyFriendRequest = async (friendid) => {
    console.log("click! deny:" + friendid)

    const token = localStorage.getItem('token');
    let uid = localStorage.getItem('userid');

    if (uid !== null) {
      uid = parseInt(uid);
    }

    document.getElementById(`approve${friendid}`).disabled = true;
    document.getElementById(`approve${friendid}`).style.color = 'grey';

    document.getElementById(`deny${friendid}`).disabled = true;
    document.getElementById(`deny${friendid}`).style.color = 'grey';
    document.getElementById(`deny${friendid}`).innerText = 'Denying...';


    const data = {
      uid: uid,
      fid: friendid,
      status: 'deny',
    };

    const deniedData = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/friend/`, {
      method: 'POST',
      headers: {
        'authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const deniedDataJson = await deniedData.json();

    if (deniedDataJson.status == 204) {
      console.log("Friend request denied");

      document.getElementById(`deny${friendid}`).disabled = true;
      document.getElementById(`deny${friendid}`).style.color = 'red';
      document.getElementById(`deny${friendid}`).innerText = 'Denied';

    } else {
      console.log("error denying friend request");
    }
  }

  const approveFriendRequest = async (friendid) => {
    console.log("click! approve: " + friendid)

    const token = localStorage.getItem('token');
    let uid = localStorage.getItem('userid');

    if (uid !== null) {
      uid = parseInt(uid);
    }

    document.getElementById(`approve${friendid}`).disabled = true;
    document.getElementById(`approve${friendid}`).style.color = 'grey';
    document.getElementById(`approve${friendid}`).innerText = 'Approving...';

    document.getElementById(`deny${friendid}`).disabled = true;
    document.getElementById(`deny${friendid}`).style.color = 'grey';


    const data = {
      uid: uid,
      fid: friendid,
    };

    const deniedData = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/friend/`, {
      method: 'POST',
      headers: {
        'authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const deniedDataJson = await deniedData.json();

    if (deniedDataJson.status == 200) {
      console.log("Friend request Approved");

      document.getElementById(`approve${friendid}`).disabled = true;
      document.getElementById(`approve${friendid}`).style.color = 'green';
      document.getElementById(`approve${friendid}`).innerText = 'Approved';

    } else {
      console.log("error approving friend request");
    }
  }


  return (
    <Box className="row no-gutters">
      <Box className="col-xl-12">
        {
          friendsList === undefined ?
            <Box className={`row no-gutters`}>
              <Box className="col=xl=12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Typography textAlign={'center'}>You have no pending friend request right now!</Typography>
              </Box>
            </Box>
            :
            friendsList.length === 0 ?
              <Box className={`row no-gutters`}>
                <Box className="col=xl=12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <Typography textAlign={'center'}>You have no pending friend request right now!</Typography>
                </Box>
              </Box>
              :
              friendsList.map(
                /**
                 * 
                 * @param {{userid: Number, username: String, email: String, profileicon: String, origin: String}} friend 
                 * @param {Number} index 
                 */
                (friend, index) => {
                  console.log("friend: ", friend);
                  console.log("index: ", index);

                  return (
                    <Box id={friend.origin + "T" + index} key={friend.userid} className={`row no-gutters justify-content-center`}>
                      <Box className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <Box className={`row no-gutters ${styles.friendsBody} justify-content-center`}>
                          <Box className={`col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center ${styles.alignAvatar}`}>
                            <img className={styles.friendsAvatar} src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + friend.profileicon + ".png"} alt={friend.profileicon}></img>
                          </Box>
                          <Box className={`col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 ${styles.friendsName}`}>
                            <Typography align="left">{friend.username}</Typography>
                          </Box>
                          {
                            friend.origin === 'receive' ?
                              <Box className={`col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6`}>
                                <Button id={"approve" + friend.userid} onClick={() => approveFriendRequest(friend.userid)} color="success">Approve</Button>
                                <Button id={"deny" + friend.userid} onClick={() => denyFriendRequest(friend.userid)} color="error">Deny</Button>
                              </Box>
                              :
                              <Box className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6s">
                                <Button color="info" disabled>Waiting For Response</Button>
                              </Box>
                          }
                        </Box>
                      </Box>
                    </Box>
                  )
                }
              )
        }
      </Box>
    </Box>
  );
}

export default PendingFriends;