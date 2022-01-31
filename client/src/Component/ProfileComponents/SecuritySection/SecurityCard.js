//@ts-nocheck
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPasswd } from "../../../store/action/others/profile";

const SecurityCard = ({setErrorNotif}) => {

    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [checkpassword, setCheckPassword] = useState('');
    const dispatch = useDispatch();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

    const handlePasswordChange = async () => {
        // console.log(oldpassword)
        // console.log(newpassword)
        // console.log(checkpassword)
        if (newpassword !== checkpassword || newpassword === " " || newpassword === "" || checkpassword === " " || checkpassword === "") {
            setErrorNotif({ open: true, type: 'error', message: 'Error Ocurred. Password is not similar.' })
        } else if (!passwordRegex.test(newpassword)) {
            setErrorNotif({ open: true, type: 'error', message: 'Error Ocurred. Password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and must be 8 characters long.' })
        } else {
            try {
                const uid = localStorage.getItem('userid')
                dispatch(updateUserPasswd(uid, oldpassword, newpassword))
                .then(()=>{
                    setErrorNotif({ open: true, type: 'success', message: 'Password successfully changed!' })
                })
                .catch(()=>{
                    setErrorNotif({ open: true, type: 'error', message: 'Error Ocurred. Password was not changed. Please check your inputs!' })
                });
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
            <input className="btn btn-danger" type="submit" onClick={handlePasswordChange} />
            <br />
            <br />
        </div>
    )
}


export default SecurityCard;