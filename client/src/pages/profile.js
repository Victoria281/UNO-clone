// @ts-nocheck
import React, { Component, Fragment } from "react";
import "../css/profile.css";

// const Profile = () => {
//   const [userInfo, setUserInfo] = useState([]);

//   const getUser = async () => {
//     try {
//       const uid = localStorage.getItem('userid')
//       const response = await fetch(
//         process.env.REACT_APP_API_URL + `/api/uno/user/${uid}`, {
//         method: 'GET',
//         headers: {
//           'authorization': localStorage.getItem('token'),
//         }
//       }
//       );
//       console.log(response)
//       const jsonData = await response.json();
//       var userInformation = jsonData.user;
//       console.log("userInformation")
//       console.log(userInformation)
//       setUserInfo(userInformation);
//     } catch (err) {
//       console.error(err.message);
//     }

//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   const ProfileModal = () => {
//     const [selectedIcon, setSelectedIcon] = useState(null);
//     const profileIcons = ['bird', 'cat', 'elephant', 'fox', 'frog', 'koala', 'shell', 'toucan', 'turtle', 'whale']
//     const changeIcon = async () => {
//       if (selectedIcon == null) {
//         // console.log("no icon selected")
//       } else {
//         try {
//           const uid = localStorage.getItem('userid')
//           const response = await fetch(process.env.REACT_APP_API_URL + `/api/uno/user/icon/${uid}`, {
//             method: 'PUT',
//             headers: {
//               'Content-Type': 'application/json',
//               'authorization': localStorage.getItem('token'),
//             },
//             body: JSON.stringify({
//               icon: selectedIcon
//             })
//           })
//           if (response.status === 204) {
//             alert("Profile icon updated!")
//             window.location.reload(true);
//           }
//           else {
//             alert("Error Occured!")
//           }
//         } catch (err) {
//           // console.error(err.message);
//         }
//       }

//     }


//     const setIcon = (event) => {
//       setSelectedIcon(event.target.value)
//     }

//     return (
//       <div className="modal" id="myModal">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h6> Select your profile icon:</h6>
//               <button type="button" className="close" data-dismiss="modal">
//                 &times;
//               </button>
//             </div>
//             <div className="modal-body card">
//               <form className="rating-form">
//                 <div onChange={setIcon.bind(this)}>
//                   {profileIcons.map((animal) => ((

//                     <label className="inputlabel" for={animal}>
//                       <input
//                         type="radio"
//                         name="rating"
//                         className={animal}
//                         id={animal}
//                         value={animal}
//                       />
//                       <div className="profileIconBorder">
//                         <img
//                           className="img-responsive profileIcons"
//                           alt={animal + ".png"}
//                           src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + animal + ".png"}
//                         />
//                       </div>
//                     </label>
//                   )))}
//                 </div>
//               </form>
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 data-dismiss="modal"
//                 onClick={changeIcon}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   };

//   const ChangePassword = () => {
//     const [oldpassword, setOldPassword] = useState('');
//     const [newpassword, setNewPassword] = useState('');
//     const [checkpassword, setCheckPassword] = useState('');
//     const [error, setError] = useState('');
//     const [ifWarning, setWarning] = useState(false);

//     const passwordRegex = ;

//     const handlePasswordChange = async () => {

//     }

//   };

//   const ChangeUserInfo = () => {
//     const [newusername, setNewUsername] = useState(userInfo.username);
//     const [newemail, setNewEmail] = useState(userInfo.email);
//     const [edit, setEdit] = useState(false);
//     const [error, setError] = useState('');
//     const [ifWarning, setWarning] = useState(false);


//     const handleInfoChange = async () => {
//       // console.log(newusername);
//       // console.log(newemail);

//     }

//     const toggleEdit = () => {
//       setEdit(!edit);
//     }


//   };

//   return (
//     <Fragment>
//       <div id="root">
//         <div className="gameProfileBody py-4">
//           <ProfileModal />
//           <div className="row no-gutters">
//             <div id="accordion" className="w-100">
//               {/* Profile */}
//               <div className="card my-3">
//                 <div id="headerOne" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseOne">
//                   <button className="collapsed card-link text-dark">
//                     <i className="fa fa-address-card-o"></i>    Profile
//                   </button>
//                   <i className="fa fa-arrow-down p-1"></i>
//                 </div>
//                 <div id="collapseOne" className="collapse show" data-parent="#accordion">
//                   <div id="bodyOne" className="card-body">
//                     <div className="row">
//                       <div className="col-4">
//                         <div
//                           className="mainIconBorder"
//                           data-toggle="modal"
//                           data-target="#myModal"
//                         >
//                           <img
//                             className="img-responsive mainIcon"
//                             alt={userInfo.profileicon + ".png"}
//                             src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + userInfo.profileicon + ".png"}
//                           />

//                           <div className="middle">
//                             <div className="text">Edit</div>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-8 py-2">
//                         <ChangeUserInfo />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Change Password */}
//               <div className="card my-3">
//                 <div id="headerTwo" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseTwo">
//                   <button className="collapsed card-link text-dark" >
//                     <i className="fa fa-lock"></i>    Change Password
//                   </button>
//                   <i className="fa fa-arrow-down p-1"></i>
//                 </div>
//                 <div id="collapseTwo" className="changePassword collapse" data-parent="#accordion">
//                   <div id="bodyTwo" className="card-body">
//                     <ChangePassword />
//                   </div>
//                 </div>
//               </div>

//               {/* Game Statistics */}
//               <div className="card my-3">
//                 <div id="headerThree" className="card-header d-flex justify-content-between" data-toggle="collapse" href="#collapseThree">
//                   <button className="collapsed card-link text-dark" >
//                     <i className="fa fa-line-chart"></i>    Game Statistics
//                   </button>
//                   <i className="fa fa-arrow-down p-1"></i>
//                 </div>
//                 <div id="collapseThree" className="collapse" data-parent="#accordion">
//                   <div id="bodyThree" className="card-body">
//                     <h6>Highest Score</h6>
//                     <div className="scoreBorder">
//                       <p>{userInfo.score}</p>
//                       <p>
//                         Highest score attained on <br /> {(userInfo.created_by).split("T")[0]}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Profile;


export default class Profile extends Component {
  async getUser() {
    console.log('getUser() is called!');

    let prom = new Promise(async (resolve, reject) => {
      try {
        const uid = localStorage.getItem('userid');
        const response = await fetch(
          process.env.REACT_APP_API_URL + `/api/uno/user/${uid}`, {
          method: 'GET',
          headers: {
            'authorization': localStorage.getItem('token'),
          }
        });
        console.log(response);
        const jsonData = await response.json();
        var userInformation = jsonData.user;
        this.state.userInfo = userInformation;
        // this.setState({ userInfo: userInformation });

        console.log("userInformation>>>");
        console.log(userInformation);

        console.log("finished!");
        resolve(true);
      } catch (err) {
        console.error(err.message);
        reject(err.message);
      };
    });

    prom.then((resolve, reject) => {
      console.log(resolve);
      console.log(reject);
      if (resolve) {
        console.log("done");
        this.forceUpdate();
      }
    });

  };

  constructor(props) {
    super(props);
    console.log("constructor() is called");
    this.state = {
      userInfo: [],
      selectedIcon: null,
      profileIcons: ['bird', 'cat', 'elephant', 'fox', 'frog', 'koala', 'shell', 'toucan', 'turtle', 'whale'],

      oldPassword: "",
      newPassword: "",
      checkPassword: "",
      error: "",
      warning: false,
      passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,

      newUsername: "",
      newEmail: "",
      edit: false,
    };

    this.getUser();
  };



  // Profile Modal
  ProfileModal(state) {
    console.log('profile modal is called!');

    console.log("this.state.uInfo:", state);
    const { profileIcons } = state.state;
    console.log("profileIcons>>>", profileIcons);

    const setIcon = (event) => {
      console.log("triggered!...", event.target.value);
      this.setState({ selectedIcon: event.target.value });
    };

    const changeIcon = async () => {
      const { selectedIcon } = state.state;

      if (selectedIcon == null) {
        // no icon is selected
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
            // alert("Profile icon updated!")
            console.log("Profile icon updated!");
            window.location.reload(true);
          }
          else {
            console.log("Error updating profile icon");
            console.log("Error Code: " + response.status);
            console.log("Error Message: " + response.statusText);
          }
        } catch (err) {
          // console.error(err.message);
        }
      }
    };

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
                  {profileIcons.map((animal) => (
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
                          alt={animal + ".png"}
                          src={process.env.REACT_APP_API_URL + "/api/uno/profile_icons/" + animal + ".png"}
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </form>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={changeIcon()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  };

  // Change Password
  ChangePassword(state) {
    console.log("..", state.state);
    const { error } = state.state;

    async function handlePasswordChange() {
      const { oldPassword, newPassword, checkPassword, passwordRegex } = state.state;
  
      // console.log(oldpassword)
      // console.log(newpassword)
      // console.log(checkpassword)
      if (newPassword !== checkPassword || newPassword === " " || newPassword === "" || checkPassword === " " || checkPassword === "") {
        state.state.warning = true;
        state.state.error = "Passwords do not match!";
  
      } else if (!passwordRegex.test(newPassword)) {
        state.state.warning = true;
        state.state.error = "Password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and must be 8 characters long.";
  
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
              old_password: oldPassword,
              new_password: newPassword
            })
          })
          if (response.status === 204) {
            console.log("Password Successfully Changed!");
            window.location.reload(true);
          }
          else {
            state.state.warning = true;
            state.state.error = "Password was not changed. Please check your inputs!";

          }
        } catch (err) {
          // console.error(err.message);
        }
      }
    };

    return (
      <div>
        <p>
          <input
            type="password"
            placeholder="Enter Old Password"
            id="p1"
            className="password"
            onChange={(e) => { state.state.oldPassword = e.target.value }} 
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Enter New Password"
            id="p2"
            className="password"
            onChange={(e) => { state.state.newPassword = e.target.value }}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Confirm New Password"
            id="p3"
            className="password"
            onChange={(e) => { state.state.changePassword = e.target.value }}
          />
        </p>
        {
          state.state.warning ?
            <div className="alert alert-danger">{error}</div> :
            null
        }
        <input className="btn btn-danger" type="submit" onClick={handlePasswordChange()} />
        <br />
        <br />
      </div>
    )
  };

  // Change User Information
  ChangeUserInfo(state) {
    const { userInfo, newUsername, newEmail, edit, error, warning } = state.state;

    // this.setState({
    //   newUsername: state.state.userInfo.username,
    //   newEmail: state.state.userInfo.email
    // });

    function toggleEdit() {
      state.state.edit = !state.state.edit;
    };

    async function handleUserInfoChange() {
      const { newUsername, newEmail } = state.state;
  
      if (newUsername === "" || newEmail === "") {
        state.state.warning = true;
        state.state.error = "Please fill out all fields!";
  
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
              username: newUsername,
              email: newEmail
            })
          })
          if (response.status === 204) {
            console.log("User Information Successfully Changed!");
            window.location.reload(true);
  
          }
          else {
            state.state.warning = true;
            state.state.error = "User Information was not changed. Please check your inputs!";
  
          }
        } catch (err) {
          console.error(err.message);
          state.state.warning = true;
          state.state.error = "User Information was not changed. Please check your inputs!";
  
        }
  
      }
    };

    if (edit) {
      return (
        <div className="row align-items-end">
          <div className="rol">
            <h5>Username:</h5>
            <p>
              <input
                type="text"
                value={newUsername}
                className="username"
                onChange={(e) => { this.setState({ newUsername: e.target.value }); }}
              />
            </p>
            <h5>Email:</h5>
            <p>
              <input
                type="text"
                value={newEmail}
                className="email"
                onChange={(e) => { this.setState({ newEmail: e.target.value }); }}
              />
            </p>
          </div>
          <div className="col">
            {
              warning ?
                <div className="alert alert-danger m-3">{error}</div> :
                null
            }
            <input className="btn btn-danger m-3" type="submit" onClick={handleUserInfoChange()} />
            <button className="btn btn-primary m-3" onClick={toggleEdit()}> Cancel </button>
          </div>
        </div>);
    } else {
      return (
        <div className="my-auto row">
          <div className="col">
            <div className="d-flex justify-content-between">
              <h5>Username:</h5>
              <button className="editBtn text-secondary" onClick={toggleEdit()}>Edit</button>
            </div>
            <p className="username">{userInfo.username}</p>
            <h5>Email:</h5><p className="email">{userInfo.email}</p>
          </div>
          <div className="col"></div>
        </div>);
    }

  }

  render() {
    console.log("running!");
    console.log("this.state.profileIcons:", this.state.userInfo);

    const { userInfo } = this.state;

    if (userInfo.length === 0) {
      console.log("length0");
      return (
        <Fragment>
          <div id="root">
            <h1>Loading User Information...</h1>
          </div>
        </Fragment>
      );

    } else {
      console.log("length1");
      return (
        <Fragment>
          <div id="root">
            <div className="gameProfileBody py-4">
              <this.ProfileModal state={this.state} />
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
                            <this.ChangeUserInfo state={this.state} />
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
                        <this.ChangePassword state={this.state} />
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
                            Highest score attained on <br /> {(userInfo.created_by)}
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
    }
  };
}
