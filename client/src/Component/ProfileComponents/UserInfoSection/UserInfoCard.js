//@ts-nocheck
import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from "../../../store/action/others/profile";

const UserInfoCard = () => {
    const dispatch = useDispatch();
    const profile_state = useSelector(state => state.profile_info)
    console.log("profile_state")
    console.log(profile_state.userInfo)
  
  const ChangeUserInfo = () => {
    const [newusername, setNewUsername] = useState(profile_state.userInfo.username);
    const [newemail, setNewEmail] = useState(profile_state.userInfo.email);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState('');
    const [ifWarning, setWarning] = useState(false);
    const uid = localStorage.getItem('userid')

    const handleInfoChange = async () => {
      // console.log(newusername);
      // console.log(newemail);
      if (newusername === "" || newemail === "") {
        setError("Username and/or Email field is empty");
        setWarning(true);
      } else {
        try {
          const response = dispatch(updateUserInfo(uid, newusername,newemail));
          console.log(response + "-----------------------------------")
           if (response.status === 204) {
             alert("User Info updated!")
             window.location.reload(true);
           }
           else {
             setError("User Info was not changed. Please check your inputs");
             setWarning(true);
           }
         } catch (err) {
           setError("User Info was not changed. Please check your inputs");
       setWarning(true);
           console.error(err.message);
         }
      }
    }

    const toggleEdit = () => {
      setEdit(!edit);
    }

    return(
      <Fragment>
        {edit ? 
          <div className="row align-items-end">
            <div className="rol">
              <h5>Username:</h5>
              <p>
                <input
                  type="text"
                  value={newusername}
                  className="username"
                  onChange={(e) => { setNewUsername(e.target.value) }}
                />
              </p>
              <h5>Email:</h5>
              <p>
                <input
                  type="text"
                  value={newemail}
                  className="email"
                  onChange={(e) => { setNewEmail(e.target.value) }}
                />
              </p>
            </div>
            <div className="col">
                {
                  ifWarning ?
                    <div className="alert alert-danger m-3">{error}</div> :
                    null
                }
              <input className="btn btn-danger m-3" type="submit" onClick={handleInfoChange} />
              <button className="btn btn-primary m-3" onClick={toggleEdit}> Cancel </button>
            </div>
          </div>
          : 
          <div className="my-auto row">
            <div className="col">
              <div className="d-flex justify-content-between">
                <h5>Username:</h5>
                <button className="editBtn text-secondary" onClick={toggleEdit}>Edit</button>
              </div>
              <p className="username">{profile_state.userInfo.username}</p>
              <h5>Email:</h5><p className="email">{profile_state.userInfo.email}</p>
            </div>
            <div className="col"></div>
          </div>
      }
      </Fragment>
    );
  }

  return (
    <div className="row">
    <div className="col-4">
      <div
        className="mainIconBorder"
        data-toggle="modal"
        data-target="#myModal"
      >
        <img
          className="img-responsive mainIcon"
          alt={profile_state.userInfo.profileicon + ".png"}
          src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + profile_state.userInfo.profileicon + ".png"}
        />

        <div className="middle">
          <div className="text">Edit</div>
        </div>
      </div>
    </div>
    <div className="col-8 py-2">
      <ChangeUserInfo />
    </div>
  </div>
  );
}

export default UserInfoCard;