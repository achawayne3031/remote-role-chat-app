import Container from "react-bootstrap/Container";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./../styles/signup.scss";
import chatLogo from "./../assets/chatLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { addConnectedUser, setUserForChat } from "../store/chatSlice";
import { setLoggedIn, addUserData, setConnected } from "../store/userStatus";
import UserItem from "../components/UserItem";
import "./../styles/chat-box.scss";
import { filterArray } from "../util/funcHelper";
import { socket } from "../socket/SocketIo";

const ChatBox = () => {
  const connectedUserListStored = useSelector(
    (state) => state.chat.connectedUsers
  );

  const [connectedUsersList, setConnectedUsersList] = useState(null);
  const [chatMessage, setChatMessage] = useState([]);
  const selectedUser = useSelector((state) => state.chat.selectedChatUser);

  const currentUserData = useSelector((state) => state.user.data);
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const connected = useSelector((state) => state.user.connected);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
    setConnectedUsersList(connectedUserListStored);
  }, [connected, loggedIn, connectedUsersList]);

  const [searchText, setSearchText] = useState("");

  const handleSearchFilter = async (event) => {
    const value = event.target.value;
    setSearchText(value);

    if (value !== "") {
      let trimedValue = value.trim().toLowerCase();
      let filteredList = filterArray("*" + trimedValue, connectedUsersList);
      setConnectedUsersList(filteredList);
    } else {
      setConnectedUsersList(connectedUserListStored);
    }
  };

  const handleChange = async (event) => {
    //  const name = event.target.name;
    //  const value = event.target.value;
    // setFieldValue(name, value);
  };

  const handleSelectUserToChat = (data) => {
    dispatch(setUserForChat(data));
  };

  const handleSendChatMessage = (event) => {
    const value = event.target.value;
    let d = new Date();
    if (value !== "") {
      let socketMessageData = {
        to: selectedUser.socketId,
        from: currentUserData.socketId,
        message: value,
        timeAgo: d.toLocaleTimeString(),
        read: false,
      };
      socket.emit("send-message", socketMessageData);
    }
  };

  const handleTrackKeyPress = (event) => {
    const value = event.target.value;
    if (value !== "" && event.key == "Enter") {
      event.preventDefault();
      handleSendChatMessage();
    }
  };

  return (
    <>
      <Container fluid style={{ backgroundColor: "#8BABD8", padding: "50px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",

            padding: "30px",
          }}
        >
          <div className="row">
            <div
              style={{ backgroundColor: "#ffffff" }}
              className="col-md-3 col-12"
            >
              <div className="text-center">
                <img src={chatLogo} className="img-fluid" />
              </div>
              <div>
                <input
                  className="search-box"
                  name="search"
                  placeholder="Search"
                  value={searchText}
                  onChange={handleSearchFilter}
                />
              </div>

              {connectedUsersList &&
                connectedUsersList.map((userItem) => {
                  return (
                    <UserItem
                      onClick={() => handleSelectUserToChat(userItem)}
                      data={userItem}
                    />
                  );
                })}
            </div>

            <div className="col-md-9 col-sm-12">
              <div>
                <h5>{selectedUser && selectedUser.name}</h5>
              </div>
              <div className="chat-wrapper"></div>

              <div className="message-input-wrapper">
                <input
                  onChange={handleSendChatMessage}
                  onKeyUp={handleTrackKeyPress}
                  className="chat-message"
                  placeholder="Message"
                />
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default ChatBox;
