import "./../styles/chat-list-item.scss";

const ChatItemList = ({ chatItemData, currentUserData }) => {
  return (
    <>
      <ul class="chat-ul-wrapper">
        {chatItemData &&
          chatItemData.map((chatItem, index) => {
            return (
              <li
                key={index}
                className={
                  chatItem.to == currentUserData.email
                    ? "shit-right"
                    : "shit-left"
                }
              >
                <span className="text-start">{chatItem.message}</span>

                <span className="time-keeper-text">
                  <span
                    className={
                      chatItem.to == currentUserData.email
                        ? "time-shift-left"
                        : "time-shift-right"
                    }
                  >
                    {chatItem.timeAgo}
                  </span>
                </span>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default ChatItemList;
