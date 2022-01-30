// @ts-nocheck
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {
    Drawer,
    Box
} from '@mui/material';
import styles from "./styles.module.css"
import ChatIcon from "../../../../icons/chatLogo.png"
import ProfileIcon from "../../../../icons/profile.png"
import {
    sendMessage,
} from "../../../../store/action/multiplayer/rooms"
//gets the data from the action object and reducers defined earlier
const ChatArea = ({ username, roomcode, socket }) => {
    const dispatch = useDispatch();
    const [textingMsg, setTextingMsg] = useState("");
    const [chatOpen, setChatOpen] = useState(false);
    const messages = useSelector(state => state.multiplayer_rooms.chat)

    const sendData = () => {
        if (textingMsg !== "") {
            console.log(textingMsg);
            dispatch(sendMessage(textingMsg, socket))
            setTextingMsg("");
        }
    };

    const toggleDrawer = (open) => (event) => {
         if (event.type !== 'keydown' || (event.type === 'keydown' && event.key === 'Escape')){
            setChatOpen(open);
        }
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        console.log("im called")
        if (messagesEndRef && messagesEndRef.current)
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };


    useEffect(
        scrollToBottom , [messages]);

    return (
        <div>
            <Box onClick={toggleDrawer(true)}>
                <img
                    className="img-responsive"
                    style={{ width: 100 }}
                    src={ChatIcon}
                    alt="logo"
                />
            </Box>
            <Drawer
                anchor={"right"}
                open={chatOpen}
                onClose={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <div className={styles.ChatDrawer}>

                    <div className={`row no-gutters ${styles.ChatHeader}`}>
                        <div className="col-4">
                            <img
                                className="img-responsive"
                                style={{ width: 40 }}
                                src={ProfileIcon}
                                alt="logo"
                            />
                        </div>
                        <div className="col-8">
                        <p>{username}</p>
                        <p>{roomcode}</p>
                        </div>
                    </div>
                    <div className={styles.ChatBody}>
                        {messages.map((i, index) => {
                            if (i.username === username) {
                                return (
                                    <div key={'p1' + index} className="mymessage">
                                        <p>{i.text}</p>
                                    </div>
                                );
                            } else if (i.username === "system") {
                                return (
                                    <div key={'sys' + index} className="systemMessage">
                                        <p>{i.text}</p>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={'other' + index} className="othermessage">
                                        <p>{i.text} </p>
                                    </div>
                                );
                            }
                        })}
                        <div ref={messagesEndRef} />
                        <p>Where am i?</p>
                    </div>
                    <div className={styles.ChatMessage}>
                        <input
                            key="inputbutton"
                            placeholder="Type a message"
                            value={textingMsg}
                            onChange={(e) => setTextingMsg(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    sendData();
                                }
                            }}
                        ></input>
                        <button onClick={() => sendData()}>&gt;&gt;</button>
                    </div>
                </div>
            </Drawer>

        </div>
    );
}
export default ChatArea;