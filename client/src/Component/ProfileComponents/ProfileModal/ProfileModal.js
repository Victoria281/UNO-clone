//@ts-nocheck

import { Fragment, useEffect, useState } from "react";
   
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

export default ProfileModal;
