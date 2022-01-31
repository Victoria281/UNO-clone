//@ts-nocheck
import { Fragment, useEffect, useState } from "react";

const UserInfoCard = () => {
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
  );
}

export default UserInfoCard;