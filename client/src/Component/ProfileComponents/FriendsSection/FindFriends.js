// @ts-nocheck
import { Suspense, useEffect, useState } from "react";
import { Box, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

import styles from './styles.module.css';
import Loader from "../../OtherComponents/LoadingComponent/Loader";

const FindFriends = () => {
  // all users from db
  const [allUsers, setAllUsers] = useState([]);

  // all filtered users (means friends not included) from db
  const [filteredUsers, setFilteredUsers] = useState([]);

  // all friends for db
  const [friendsList, setFriendsList] = useState([]);

  // constantly updated when user is typing
  const [searchFilters, setSearchFilter] = useState([]);

  // added friend
  const [addedFriend, setAddedFriend] = useState([]);
  const [pendingFR, setPendingFR] = useState([]);


  const loadData = async () => {
    let allUsersData;
    let extAllUsers;
    let backupAllUsersData;
    let friendsList;
    let pendingFriends_tmpArray;
    let pendingFRs;

    // Get all Users
    try {
      const findFriendsResponse = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user`, {
        method: 'GET',
      });

      allUsersData = await findFriendsResponse.json();
      extAllUsers = allUsersData.users;
      setAllUsers(allUsersData);

      console.log("allUsers", allUsersData);

    } catch (error1) {
      console.error("error retrieving users:", error1);

    }

    // Get all Friends
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

      const allFriendsData = await response.json();
      friendsList = allFriendsData.data.rows;
      console.log("getAllFriends | friendsList", friendsList);

      setFriendsList(friendsList);

    } catch (error2) {
      console.error("error retrieving friends:", error2);
    }

    // Get all pending friends
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
        const getPendingFriendsData = data.data;

        if (getPendingFriendsData === null || getPendingFriendsData === undefined || getPendingFriendsData.length === 0) {
          console.log("no friends dey");
        }

        console.log("getPendingFriends | getPendingFriendsData", getPendingFriendsData);

        let tmpArray = [];

        getPendingFriendsData.forEach(friend => {
          let userid = parseInt(friend.split('_')[1]);
          console.log("userid:", userid);
          tmpArray.push(userid);
        });

        console.log("getPendingFriendsData | tmpArray:", tmpArray);
        pendingFriends_tmpArray = tmpArray;

        setAddedFriend(tmpArray);

      } catch (err) {
        console.error("error retrieving friends:", err);

      }

    } catch (err) {
      console.error("error retrieving friends:", err);
    }

    // Get all sent friend requests
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
        console.log('getSentFriendRequests | tmpArray3 | DATATATATTA:', data);
        const getSentFriendRequests = data.data;

        if (getSentFriendRequests === null || getSentFriendRequests === undefined || getSentFriendRequests.length === 0) {
          console.log("no friends dey");
        }

        console.log("getSentFriendRequests | getSentFriendRequests", getSentFriendRequests);

        let tmpArray2 = [];

        getSentFriendRequests.forEach(friend => {
          let userid = parseInt(friend.split('_')[2]);
          tmpArray2.push(userid);
        });

        console.log("getSentFriendRequests | tmpArray2", tmpArray2);

        let sentFRArray = [];

        extAllUsers.forEach((user) => {
          for (let i = 0; i < tmpArray2.length; i++) {
            console.log("user:", user.userid);
            console.log("tmpArray:", tmpArray2[i]);
            if (user.userid === tmpArray2[i]) {
              console.log('push!');
              sentFRArray.push(user);
            }
          }
        });

        console.log("getSentFriendRequests | sentFRArray", sentFRArray);

        pendingFRs = sentFRArray;

        setPendingFR(sentFRArray);

      } catch (err) {
        console.error("error retrieving friends:", err);

      }

    } catch (err) {
      console.error("error retrieving friends:", err);
    }

    // Filter out all users that are already friends
    try {
      // console.log("filter | extAllUsers", extAllUsers);
      // console.log("filter | friendsList", friendsList);
      console.log("filter | pendingFriends_tmpArray", pendingFriends_tmpArray);
      // console.log("filter | pendingFRs", pendingFRs);

      // Filters out users who are already friends, user who is the same as the token holder and users in pending requests

      let userid = localStorage.getItem('userid');

      try {
        if (userid !== null) {
          userid = parseInt(userid);
        }

        for (let i = 0; i < extAllUsers.length; i++) {
          if (extAllUsers[i].userid == userid) {
            extAllUsers.splice(i, 1);
            break;
          }
        }
      } catch (err) {
        console.error("error retrieving userid:", err);
      }

      let x = 0;
      for (let i = 0; i < extAllUsers.length; i++) {
        if (friendsList.length <= 0) {
          break;
        }

        if (x > friendsList.length || friendsList[x] === undefined) {
          break;
        }

        if (extAllUsers[i].userid == friendsList[x].userid) {
          extAllUsers.splice(i, 1);
          i = -1;
          x++;
        }
        console.log(">", extAllUsers);
      }

      console.log("filter | after deduction of friends", extAllUsers);

      let y = 0;
      for (let j = 0; j < extAllUsers.length; j++) {

        console.log("ppppp", pendingFriends_tmpArray);
        if (pendingFriends_tmpArray.length <= 0) {
          break;
        }

        if (y > pendingFriends_tmpArray.length || pendingFriends_tmpArray[y] === undefined) {
          break;
        }

        if (extAllUsers[j].userid == pendingFriends_tmpArray[y]) {
          extAllUsers.splice(j, 1);
          j = -1;
          y++;
        }
        console.log(">>", extAllUsers);
      }

      console.log("filter | after deduction of pending friends", extAllUsers);

      let z = 0;
      for (let k = 0; k < extAllUsers.length; k++) {

        if (pendingFRs.length <= 0) {
          break;
        }

        if (z > pendingFRs.length || pendingFRs[z] === undefined) {
          break;
        }

        if (extAllUsers[k] == pendingFRs[z]) {
          extAllUsers.splice(k, 1);
          k = -1;
          z++;
        }
        console.log(">>>", k, ".", z, extAllUsers);
      }

      console.log("filter | after deduction of pending FRs", extAllUsers);


      setFilteredUsers(extAllUsers);
      setSearchFilter(extAllUsers);

    } catch (error3) {
      console.error("error filtering users:", error3);
    }

  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async (friendid) => {
    console.log("friendid", friendid);

    document.getElementById("addT" + friendid).innerText = "Loading";
    document.getElementById("addT" + friendid).style.color = "grey";
    document.getElementById("addT" + friendid).disabled = true;


    const token = localStorage.getItem('token');
    let uid = localStorage.getItem('userid');

    if (uid !== null) {
      uid = parseInt(uid);
    }

    const data = {
      uid: uid,
      fid: friendid,
      status: 'add'
    }

    const responseAddFriend = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/friend`, {
      method: 'POST',
      headers: {
        'authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const dataAddFriend = await responseAddFriend.json();
    console.log("dataAddFriend:", dataAddFriend);

    if (dataAddFriend.code === 204) {
      console.log("friend request sent");

      document.getElementById("addT" + friendid).innerText = "Request Sent!";
      document.getElementById("addT" + friendid).style.color = "green";
      document.getElementById("addT" + friendid).disabled = true;

      setTimeout(() => {
        document.getElementById("userRow" + friendid).remove();
      }, 3000);

    }

    if (dataAddFriend.code === 400) {
      console.log("Friend Request Already Sent");
      document.getElementById("addT" + friendid).innerText = "Request Already Sent";
      document.getElementById("addT" + friendid).style.color = "red";
      document.getElementById("addT" + friendid).disabled = true;

    }


  };

  return (
    <Box className="row no-gutters">
      <Box className="col-xl-12">
        <Box className="row no-gutters">
          <Box className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4"></Box>
          <Box className="col-xl-4 text-center mb-4">
            <TextField label="Search for Friend" fullWidth='true' onChange={(event) => {

              // console.log("value:", event.target.value);
              // console.log("allUsers:", allUsers);

              let tmpArray = [];

              for (let i = 0; i < filteredUsers.length; i++) {
                // console.log(filteredUsers[i]);
                if (filteredUsers[i].username.toLowerCase().includes(event.target.value.toLowerCase())) {
                  tmpArray.push(filteredUsers[i]);
                }
              }
              // console.log("tmpArray:", tmpArray);
              setSearchFilter(tmpArray);

            }} />
          </Box>
          <Box className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4"></Box>
        </Box>
        <Suspense fallback={<Loader />}>
          {console.log("filteredUsers:", filteredUsers)}
          {console.log("searchFilters:", searchFilters)}
          {
            searchFilters.length <= 0 ?
              <Box className={`row no-gutters`}>
                <Box className="col=xl=12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <Typography textAlign={'center'}>Oops! The user cannot be found! Are you sure the user is not your friend already?</Typography>
                </Box>
              </Box>
              :
              searchFilters.map(
                /**
                 * 
                 * @param {{userid: Number, username: String, email: String, profileicon: String}} friend 
                 * @param {Number} index 
                 */
                (user, index) => {
                  console.log("index: ", index);

                  return (
                    <Box id={"userRow" + user.userid} key={user.userid} className={`row no-gutters justify-content-center`}>
                      {/* <Box className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3"></Box> */}
                      <Box className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6">
                        <Box className={`row no-gutters ${styles.usersBody}`}>
                          <Box className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2"></Box>
                          <Box className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-xs-2" sx={{ height: '50%', padding: 1, margin: 'auto' }}>
                            <img className={styles.usersAvatar} src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + user.profileicon + ".png"} alt={user.profileicon}></img>
                          </Box>
                          <Box className={`col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4`} sx={{ height: '50%', padding: 1, margin: 'auto' }}>
                            <Typography align="left">{user.username}</Typography>
                          </Box>
                          <Box className={`col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4`} sx={{ height: '50%', padding: 1, margin: 'auto' }}>
                            <Button id={"addT" + user.userid.toString()} onClick={() => handleAdd(user.userid)}>Add Friend</Button>
                          </Box>
                        </Box>
                      </Box>
                      {/* <Box className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3"></Box> */}
                    </Box>
                  )
                }
              )
          }
        </Suspense>
      </Box>
    </Box>
  )
}
export default FindFriends;