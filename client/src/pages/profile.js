import React, { Fragment, useEffect, useState } from "react";
import "../css/profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);

  const getUser = async () => {
    try {
      const uid = localStorage.getItem('userid')
      const response = await fetch(
        `http://localhost:5000/api/uno/user/${uid}`
      );
      const jsonData = await response.json();
      var userInformation = jsonData.user;
      console.log(userInformation)
      setUserInfo(userInformation);
    } catch (err) {
      console.error(err.message);
    }

  };

  useEffect(() => {
    getUser();
  }, []);

  const ProfileModal = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const profileIcons = ['bird', 'cat', 'elephant', 'fox', 'frog', 'koala', 'shell', 'toucan', 'turtle', 'whale']
    const changeIcon = async () => {
      if (selectedIcon == null) {
        console.log("no icon selected")
      } else {
        try {
          const uid = localStorage.getItem('userid')
          const response = await fetch(`http://localhost:5000/api/uno/user/icon/${uid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              icon: selectedIcon
            })
          })
          if (response.status === 204) {
            alert("Profile icon updated!")
            window.location.reload(true);
          }
          else {
            alert("Error Occured!")
          }
        } catch (err) {
          console.error(err.message);
        }
      }

    }


    const setIcon = (event) => {
      setSelectedIcon(event.target.value)
    }
    return (
      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h6> Select your profile icon:</h6>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div class="modal-body card">
              <form class="rating-form">
                <div onChange={setIcon.bind(this)}>
                  {profileIcons.map((animal) => ((

                    <label for={animal}>
                      <input
                        type="radio"
                        name="rating"
                        class={animal}
                        id={animal}
                        value={animal}
                      />
                      <div class="profileIconBorder">
                        <img
                          class="img-responsive profileIcons"
                          src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + animal + ".png"}
                        />
                      </div>
                    </label>
                  )))}
                </div>
              </form>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={changeIcon}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const ChangePassword = () => {
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [checkpassword, setCheckPassword] = useState('');

    const handlePasswordChange = async ()=>{
      console.log(oldpassword)
      console.log(newpassword)
      console.log(checkpassword)
      if (newpassword!== checkpassword || newpassword===" " || newpassword==="" || checkpassword===" " || checkpassword===""){
        alert("Password is not similar")
      } else {
        try {
          const uid = localStorage.getItem('userid')
          const response = await fetch(`http://localhost:5000/api/uno/user/update/${uid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              old_password: oldpassword,
              new_password: newpassword
            })
          })
          if (response.status === 204) {
            alert("Password changed!")
            window.location.reload(true);
          }
          else {
            alert("Error Occured!")
          }
        } catch (err) {
          console.error(err.message);
        }
      }
    }
    return (
      <div>
      <h6>Change Password</h6>
      <br />
      <p>
        <input
          type="password"
          placeholder="Enter Old Password"
          id="p1"
          class="password"
          onChange={(e) => {setOldPassword(e.target.value)}}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Enter New Password"
          id="p2"
          class="password"
          onChange={(e) => {setNewPassword(e.target.value)}}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Confirm Password"
          id="p3"
          class="password"
          onChange={(e) => {setCheckPassword(e.target.value)}}
        />
      </p>
      <input type="submit" onClick={handlePasswordChange} />
      <br />
      <br />
    </div>
    )
  }

  return (
    <Fragment>
      <div id="root">
        <div class="gameProfileBody">
          <h2>Profile</h2>
          <br />

          <ProfileModal />
          <div class="row no-gutters">
            <div class="col-6">
              <div class="gameProfile shadowing">
                <div
                  class="mainIconBorder"
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  <img
                    class="img-responsive mainIcon"
                    src={"https://uno-clone.herokuapp.com/api/uno/profile_icons/" + userInfo.profileicon + ".png"}
                  />

                  <div class="middle">
                    <div class="text">Edit</div>
                  </div>
                </div>
                <p class="username">{userInfo.username}</p>
                <p class="email">{userInfo.email}</p>
                <div class="changeInfo">
                  <input
                    type="password"
                    value=""
                    placeholder="Enter Password"
                    id="p"
                    class="password"
                    hidden
                  />
                  <input type="submit" hidden />
                </div>
              </div>
            </div>
            <br />
            <div class="col-6">
              <div class="row no-gutters">
                <div id="box" class="shadowing">
                  <br />
                  <ChangePassword />
                  
                </div>
              </div>
              <div class="row no-gutters">
                <div id="scorebox" class="shadowing">
                  <div class="row no-gutters">
                    <div class="col-6">
                      <div class="scoreBorder">
                        <p>{userInfo.score}</p>
                      </div>
                    </div>
                    <div class="col-6">
                      <p>
                        Highest score attained at <br /> {userInfo.created_by}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
