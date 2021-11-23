import React, { Fragment, useEffect, useState } from "react";
import "../css/profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);

  const getUser = async () => {
    try {
      const uid = localStorage.getItem('userid')
      const response = await fetch(
        `https://uno-clone.herokuapp.com/api/uno/user/${uid}`
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
          const response = await fetch(`https://uno-clone.herokuapp.com/api/uno/user/icon/${uid}`, {
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

    const handlePasswordChange = async () => {
      console.log(oldpassword)
      console.log(newpassword)
      console.log(checkpassword)
      if (newpassword !== checkpassword || newpassword === " " || newpassword === "" || checkpassword === " " || checkpassword === "") {
        alert("Password is not similar")
      } else {
        try {
          const uid = localStorage.getItem('userid')
          const response = await fetch(`https://uno-clone.herokuapp.com/api/uno/user/update/${uid}`, {
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
        <p>
          <input
            type="password"
            placeholder="Enter Old Password"
            id="p1"
            class="password"
            onChange={(e) => { setOldPassword(e.target.value) }}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Enter New Password"
            id="p2"
            class="password"
            onChange={(e) => { setNewPassword(e.target.value) }}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Confirm New Password"
            id="p3"
            class="password"
            onChange={(e) => { setCheckPassword(e.target.value) }}
          />
        </p>
        <input className="btn btn-danger" type="submit" onClick={handlePasswordChange} />
        <br />
        <br />
      </div>
    )
  }

  return (
    <Fragment>
      <div id="root">      
          <div class="gameProfileBody py-4">
              <ProfileModal />
              <div class="row no-gutters">
                <div id="accordion" className="w-100">
                  {/* Profile */}
                  <div class="card my-3">
                    <div id="headerOne" class="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseOne">
                      <a class="collapsed card-link text-dark">
                        <i class="fa fa-address-card-o"></i>    Profile
                      </a>
                      <i class="fa fa-arrow-down p-1"></i>
                    </div>
                    <div id="collapseOne" class="collapse show" data-parent="#accordion">
                      <div  id="bodyOne" class="card-body">
                <div className="row">
                  <div className="col-4">
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
                  </div>
                  <div className="col-8 py-2">
                    <div className="my-auto">
                      <h5>Username:</h5><p class="username"> {userInfo.username}</p>
                      <h5>Email:</h5><p class="email">{userInfo.email}</p>
                    </div>
                    {/* What is this */}
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
                      </div>
                    </div>
                  </div>
    
                  {/* Change Password */}
                  <div class="card my-3">
                    <div id="headerTwo" class="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseTwo">
                      <a class="collapsed card-link text-dark" >
                      <i class="fa fa-lock"></i>    Change Password
                      </a>
                      <i class="fa fa-arrow-down p-1"></i>
                    </div>
                    <div id="collapseTwo" class="changePassword collapse" data-parent="#accordion">
                      <div id="bodyTwo" class="card-body">
                      <ChangePassword />
                      </div>
                    </div>
                  </div>
    
                  {/* Game Statistics */}
                  <div class="card my-3">
                    <div id="headerThree" class="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseThree">
                      <a class="collapsed card-link text-dark" >
                      <i class="fa fa-line-chart"></i>    Game Statistics
                      </a>
                      <i class="fa fa-arrow-down p-1"></i>
                    </div>
                    <div id="collapseThree" class="collapse" data-parent="#accordion">
                      <div id="bodyThree" class="card-body">
                      <h6>Highest Score</h6>
                        <div class="scoreBorder">
                            <p>{userInfo.score}</p>
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
