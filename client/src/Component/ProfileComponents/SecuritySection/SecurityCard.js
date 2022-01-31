//@ts-nocheck
import { Fragment, useEffect, useState } from "react";

const SecurityCard = () => {

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


export default SecurityCard;