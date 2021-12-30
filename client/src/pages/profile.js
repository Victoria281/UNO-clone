// @ts-nocheck
import { Fragment, useEffect, useState } from "react";
import "../css/profile.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState([]);

  const getUser = async () => {
    try {
      const uid = localStorage.getItem('userid')
      const response = await fetch(
        process.env.REACT_APP_API_URL + `/api/uno/user/${uid}`,  {
          method: 'GET',
          headers: {
            'authorization': localStorage.getItem('token'),
          }}
      );
      console.log(response)
      const jsonData = await response.json();
      var userInformation = jsonData.user;
      console.log("userInformation")
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
        // console.log("no icon selected")
      } else {
        try {
          const uid = localStorage.getItem('userid')
          const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/icon/${uid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'authorization': localStorage.getItem('token'),
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
          // console.error(err.message);
        }
      }

    }


    const setIcon = (event) => {
      setSelectedIcon(event.target.value)
    }
    
    return (
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6> Select your profile icon:</h6>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body card">
              <form className="rating-form">
                <div onChange={setIcon.bind(this)}>
                  {profileIcons.map((animal) => ((

                    <label className="inputlabel" for={animal}>
                      <input
                        type="radio"
                        name="rating"
                        className={animal}
                        id={animal}
                        value={animal}
                      />
                      <div className="profileIconBorder">
                        <img
                          className="img-responsive profileIcons"
                          alt={animal+ ".png"} 
                          src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + animal + ".png"}
                        />
                      </div>
                    </label>
                  )))}
                </div>
              </form>
              <button
                type="button"
                className="btn btn-danger"
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
    const [error, setError] = useState('');
    const [ifWarning, setWarning] = useState(false);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    const handlePasswordChange = async () => {
      // console.log(oldpassword)
      // console.log(newpassword)
      // console.log(checkpassword)
      if (newpassword !== checkpassword || newpassword === " " || newpassword === "" || checkpassword === " " || checkpassword === "") {
        setError("Password is not similar");
        setWarning(true);
      } else if (!passwordRegex.test(newpassword)) {
        setError("Password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and must be 8 characters long.");
        setWarning(true);
      } else {
        try {
          const uid = localStorage.getItem('userid')
          const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/update/${uid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'authorization': localStorage.getItem('token'),
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
            setError("Password was not changed. Please check your inputs!");
            setWarning(true);
            //alert("Error Occured!")
          }
        } catch (err) {
          // console.error(err.message);
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
            className="password"
            onChange={(e) => { setOldPassword(e.target.value) }}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Enter New Password"
            id="p2"
            className="password"
            onChange={(e) => { setNewPassword(e.target.value) }}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Confirm New Password"
            id="p3"
            className="password"
            onChange={(e) => { setCheckPassword(e.target.value) }}
          />
        </p>
        {
          ifWarning ?
            <div className="alert alert-danger">{error}</div> :
            null
        }
        <input className="btn btn-danger" type="submit" onClick={handlePasswordChange} />
        <br />
        <br />
      </div>
    )
  }

  const ChangeUserInfo = () => {
    const [newusername, setNewUsername] = useState(userInfo.username);
    const [newemail, setNewEmail] = useState(userInfo.email);
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState('');
    const [ifWarning, setWarning] = useState(false);


    const handleInfoChange = async () => {
      // console.log(newusername);
      // console.log(newemail);
      if (newusername === "" || newemail === "") {
        setError("Username and/or Email field is empty");
        setWarning(true);
      } else {
        try {
          const uid = localStorage.getItem('userid')
          const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/updateinfo/${uid}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'authorization': localStorage.getItem('token'),
            },
            body: JSON.stringify({
              username: newusername,
              email: newemail
            })
          })
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

    if (edit) {
      return (
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
        </div>);
    } else {
      return (
        <div className="my-auto row">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h5>Username:</h5>
              <button className="editBtn text-secondary" onClick={toggleEdit}>Edit</button>
            </div>
            <p className="username">{userInfo.username}</p>
            <h5>Email:</h5><p className="email">{userInfo.email}</p>
          </div>
          <div className="col"></div>
        </div>);
    }
  }

  return (
    <Fragment>
      <div id="root">
        <div className="gameProfileBody py-4">
          <ProfileModal />
          <div className="row no-gutters">
            <div id="accordion" className="w-100">
              {/* Profile */}
              <div className="card my-3">
                <div id="headerOne" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseOne">
                  <button className="collapsed card-link text-dark">
                    <i className="fa fa-address-card-o"></i>    Profile
                  </button>
                  <i className="fa fa-arrow-down p-1"></i>
                </div>
                <div id="collapseOne" className="collapse show" data-parent="#accordion">
                  <div id="bodyOne" className="card-body">
                    <div className="row">
                      <div className="col-4">
                        <div
                          className="mainIconBorder"
                          data-toggle="modal"
                          data-target="#myModal"
                        >
                          <img
                            className="img-responsive mainIcon"
                            alt={userInfo.profileicon + ".png"}
                            src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + userInfo.profileicon + ".png"}
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
                  </div>
                </div>
              </div>

              {/* Change Password */}
              <div className="card my-3">
                <div id="headerTwo" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseTwo">
                  <button className="collapsed card-link text-dark" >
                    <i className="fa fa-lock"></i>    Change Password
                  </button>
                  <i className="fa fa-arrow-down p-1"></i>
                </div>
                <div id="collapseTwo" className="changePassword collapse" data-parent="#accordion">
                  <div id="bodyTwo" className="card-body">
                    <ChangePassword />
                  </div>
                </div>
              </div>

              {/* Game Statistics */}
              <div className="card my-3">
                <div id="headerThree" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseThree">
                  <button className="collapsed card-link text-dark" >
                    <i className="fa fa-line-chart"></i>    Game Statistics
                  </button>
                  <i className="fa fa-arrow-down p-1"></i>
                </div>
                <div id="collapseThree" className="collapse" data-parent="#accordion">
                  <div id="bodyThree" className="card-body">
                    <h6>Highest Score</h6>
                    <div className="scoreBorder">
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
