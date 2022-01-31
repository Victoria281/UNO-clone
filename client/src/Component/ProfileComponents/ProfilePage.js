// @ts-nocheck
import { Fragment, useEffect, useState } from "react";
import "./profile.css";
import UserInfoCard from './UserInfoSection/UserInfoCard'
import SecurityCard from './SecuritySection/SecurityCard'
import ProfileModal from './ProfileModal/ProfileModal'
import Friends from './FriendsSection/Friends'
import FindFriends from './FriendsSection/FindFriends'
import PendingFriends from './FriendsSection/PendingFriends'
import { useDispatch, useSelector } from 'react-redux'
import {Box} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomNotification from "../OtherComponents/NotificationComponent/Notifications";
import styles from './styles.module.css';
import FriendsNotification from "../OtherComponents/NotificationComponent/FriendsNotifications";
//import MultiplayerNotification from "../OtherComponents/NotificationComponent/MultiplayerNotification";

import {
  getUserInfo
} from "../../store/action/others/profile"

const Profile = () => {
  const dispatch = useDispatch();
  const profile_state = useSelector(state => state.profile_info)
  const [o_Notif, o_setNotif] = useState({ open: false, type: "", message: "" });
  const [editUserInfo, setEditUserInfo] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem('userid')
    if(uid !== undefined){
      dispatch(getUserInfo(uid));
    }
    console.log('profile_state returned')
    console.log(profile_state)
  }, []);

  const setErrorNotif = (data) => {
    o_setNotif(data)
  }

  const handleEditUserInfo = (data) =>{
    setEditUserInfo(data)
  }

 
  return (
    <Fragment>
      {
        //profile_state.userInfo.length === 0 
        profile_state.userInfo == undefined
        ?
          <p>Loading</p>
          :
          <Box id="root">
            <CustomNotification uopen={o_Notif} usetOpen={o_setNotif} />

            <ProfileModal 
            setErrorNotif={setErrorNotif}
            profile_state={profile_state}
            />
            <Box className="gameProfileBody py-4">
              <Box className="row no-gutters">
                <Box id="accordion" className="w-100">
                  {/* Profile */}
                  <Box className="card my-3">
                    <Box id="headerOne" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseOne">
                      <button className="collapsed card-link text-dark">
                        <AccountBoxIcon/>    Profile
                      </button>
                      <KeyboardArrowDownIcon/>{/* <i className="fa fa-arrow-down p-1"></i> */}
                    </Box>
                    <Box id="collapseOne" className="collapse show" data-parent="#accordion">
                      <Box id="bodyOne" className="card-body">
                        <UserInfoCard 
                        edit={editUserInfo}
                        handleEditUserInfo={handleEditUserInfo}
                        setErrorNotif={setErrorNotif}/>
                      </Box>
                    </Box>
                  </Box>

                  {/* Change Password */}
                  <Box className="card my-3">
                    <Box id="headerTwo" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseTwo">
                      <button className="collapsed card-link text-dark" >
                        <LockIcon/>    Change Password
                      </button>
                      <KeyboardArrowDownIcon/>
                    </Box>
                    <Box id="collapseTwo" className="changePassword collapse" data-parent="#accordion">
                      <Box id="bodyTwo" className="card-body">
                        <SecurityCard setErrorNotif={setErrorNotif}/>
                      </Box>
                    </Box>
                  </Box>

               {/* Friends */}
              <div className={`card my-3 ${styles.accordionBox}`}>
                <div id="headerThree" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseThree">
                  <button className="collapsed card-link text-dark">
                    <i className="fa fa-user-o"></i>    My Friends
                  </button>
                  <KeyboardArrowDownIcon/>
                </div>
                <div id="collapseThree" className={`collapse ${styles.accordionBoxBody}`} data-parent="#accordion">
                  <div id="bodyThree" className={`card-body`}>
                    <Friends />
                  </div>
                </div>
              </div>

              {/* Pending Friend Requests */}
              <div className={`card my-3 ${styles.accordionBox}`}>
                <div id="headerFour" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseFour">
                  <button className="collapsed card-link text-dark">
                    <i className="fa fa-user-o"></i>    My Pending Friend Requests
                  </button>
                  <KeyboardArrowDownIcon/>
                </div>
                <div id="collapseFour" className={`collapse ${styles.accordionBoxBody}`} data-parent="#accordion">
                  <div id="bodyFour" className={`card-body`}>
                    <PendingFriends />
                  </div>
                </div>
              </div>

              {/* Make Friend Requests */}
              <div className={`card my-3 ${styles.accordionBox}`}>
                <div id="headerFive" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseFive">
                  <button className="collapsed card-link text-dark">
                    <i className="fa fa-user-o"></i>    Find Friends
                  </button>
                  <KeyboardArrowDownIcon/>
                </div>
                <div id="collapseFive" className={`collapse ${styles.accordionBoxBody}`} data-parent="#accordion">
                  <div id="bodyFive" className={`card-body`}>
                    <FindFriends />
                  </div>
                </div>
              </div>
              
            </Box>
          </Box>
        </Box>
      </Box>

      }
    </Fragment>
  );
};

export default Profile;
