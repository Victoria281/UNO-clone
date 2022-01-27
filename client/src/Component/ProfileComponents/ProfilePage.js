// @ts-nocheck
import { Fragment, useEffect, useState } from "react";
import "./profile.css";
import UserInfoCard from './UserInfoSection/UserInfoCard'
import SecurityCard from './SecuritySection/SecurityCard'
import ProfileModal from './ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import {Box} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LockIcon from '@mui/icons-material/Lock';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {
  getUserInfo
} from "../../store/action/others/profile"

const Profile = () => {
  const dispatch = useDispatch();
  const profile_state = useSelector(state => state.profile_info)

  useEffect(() => {

    const uid = localStorage.getItem('userid')
    if(uid !== undefined){
      dispatch(getUserInfo(uid));
    }
    console.log('profile_state returned')
    console.log(profile_state)
  }, []);

  return (
    <Fragment>
      {
        //profile_state.userInfo.length === 0 
        profile_state.userInfo == undefined
        ?
          <p>Loading</p>
          :
          <Box id="root">
            <ProfileModal />
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
                        <UserInfoCard />
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
                        <SecurityCard />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
      }
    </Fragment>
  );
};

export default Profile;
