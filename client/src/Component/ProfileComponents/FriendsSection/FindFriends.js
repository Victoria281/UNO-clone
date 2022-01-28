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
    let allUsersData; //
    let allFriendsData; //allFriendsData.data.rows
    let pendingFRs;

    // Get all Users
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

      allFriendsData = await response.json();
      let friendsList = allFriendsData.data.rows;
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

        allUsersData.forEach((user) => {
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
      let tmpArray3 = [];
      console.log("filter | tmpArray3 ", tmpArray3);

      // Filters out users who are already friends, user who is the same as the token holder
      allUsersData.forEach(user => {
        let index = 0;
        if ((allFriendsData.data.rows).find(friend => friend.userid === user.userid) === undefined
          && user.userid !== parseInt(localStorage.getItem('userid')) && !(addedFriend.includes(user.userid))) {
          tmpArray3.push(user);
        }
      });
      console.log("filter | tmpArray3 ", tmpArray3);
      console.log("filter | array3xxx ", pendingFRs);

      let tmpArray4 = [];
      console.log("filter | tmpArray4 ", tmpArray4);

      let xx = 0;
      tmpArray3.forEach(user => {
        for (let z = 0; z < pendingFRs.length; z++) {
          if (user.userid !== pendingFRs[z].userid) {
            tmpArray4.push(user);
          }
        }
      });

      console.log("filter | tmpArray4_After ", tmpArray4);


      setFilteredUsers(tmpArray4);
      setSearchFilter(tmpArray4);

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
                    <Box id={"userRow" + index} key={user.userid} className={`row no-gutters justify-content-center`}>
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