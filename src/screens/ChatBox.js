import Container from "react-bootstrap/Container";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./../styles/signup.scss";
import chatLogo from "./../assets/chatLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { setUserForChat } from "../store/chatSlice";
import UserItem from "../components/UserItem";
import "./../styles/chat-box.scss";
import { filterArray } from "../util/funcHelper";
import {
  sendMessage,
  socket,
  getMessage,
  disConnectUser,
} from "../socket/SocketIo";
import ChatBoxHeader from "../components/ChatBoxHeader";
import ChatItemList from "../components/ChatItemList";
import { useRef } from "react";
import { setConnectedUsers } from "../store/chatSlice";
import { logOutUser } from "../store/userStatus";

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

  const chatWrapperRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
    setConnectedUsersList(connectedUserListStored);
    chatWrapperRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

    // //// Update connected users on the store /////
    socket.on("disconnect", (serverData) => {});

    socket.on("emit-active-users", (serverData) => {
      dispatch(setConnectedUsers(serverData));
    });

    ///// get sent messages ////
    socket.on("emit-sent-message", (severMessageData) => {
      let getOurDataOut = severMessageData.find(
        (myData) => myData.email === selectedUser.email
      );

      if (getOurDataOut && getOurDataOut != undefined) {
        let selectedUserChat = getOurDataOut.messages;

        setChatMessage(selectedUserChat);
      }

      setTimeout(function () {
        if (chatWrapperRef.current)
          chatWrapperRef.current.scrollTop =
            chatWrapperRef.current.scrollHeight;
      }, 10);
    });
  }, [connected, loggedIn, connectedUserListStored, chatMessage, socket]);

  const [searchText, setSearchText] = useState("");
  const [messageText, setMessageText] = useState("");

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

    getMessage();

    ///// Get messages /////
    socket.on("emit-get-message", (severMessageData) => {
      let getOurDataOut = severMessageData.find(
        (myData) => myData.email === data.email
      );

      if (getOurDataOut && getOurDataOut != undefined) {
        let selectedUserChat = getOurDataOut.messages;
        setChatMessage(selectedUserChat);

        setTimeout(function () {
          if (chatWrapperRef.current)
            chatWrapperRef.current.scrollTop =
              chatWrapperRef.current.scrollHeight;
        }, 10);
      }
    });
  };

  const handleMessageText = (event) => {
    const value = event.target.value;
    setMessageText(value);
  };

  const handleSendChatMessage = () => {
    let d = new Date();
    if (messageText !== "") {
      let socketMessageData = {
        to: selectedUser.email,
        from: currentUserData.email,
        message: messageText,
        timeAgo: d.toLocaleTimeString(),
        read: false,
      };

      /// Send message to user ///
      sendMessage(socketMessageData);

      setMessageText("");
    }
  };

  const handleTrackKeyPress = (event) => {
    if (event.key == "Enter" && messageText !== "") {
      event.preventDefault();
      handleSendChatMessage();
    }
  };

  const handleDisconnectUser = () => {
    disConnectUser();
    dispatch(logOutUser());
    navigate("/");
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
                <div className="d-flex justify-content-between">
                  <div>
                    <img src={chatLogo} className="img-fluid" />
                  </div>
                  <div>
                    <span
                      className="fa fa-sign-out logout-icon"
                      onClick={() => handleDisconnectUser()}
                    ></span>
                  </div>
                </div>
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

              {connectedUsersList
                ? connectedUsersList.map((userItem) => {
                    if (userItem.email !== currentUserData.email) {
                      return (
                        <UserItem
                          onClick={() => {
                            handleSelectUserToChat(userItem);
                          }}
                          data={userItem}
                        />
                      );
                    }
                  })
                : ""}
            </div>

            <div className="col-md-9 col-sm-12">
              {selectedUser.email ? <ChatBoxHeader data={selectedUser} /> : ""}

              <div className="chat-wrapper" ref={chatWrapperRef}>
                <ChatItemList
                  chatItemData={chatMessage}
                  currentUserData={currentUserData}
                />
              </div>

              <div className="message-input-wrapper">
                <input
                  value={messageText}
                  onChange={handleMessageText}
                  onKeyUp={(e) => handleTrackKeyPress(e)}
                  className="chat-message"
                  placeholder="Message"
                />
                <span
                  onClick={() => handleSendChatMessage()}
                  className="send-icon fa fa-paper-plane"
                ></span>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </>
  );
};

export default ChatBox;
