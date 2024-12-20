import { getFirstLetter, getLastMessage } from "../util/funcHelper";
import "./../styles/user-item.scss";

const UserItem = ({ data, onClick, notification, currentUserData }) => {
  return (
    <>
      <div className="d-flex item-wrapper" onClick={onClick}>
        {data.active ? <span className="indicator"></span> : ""}

        <div className="logo-wrapper">
          <p className="logo">{getFirstLetter(data.name)}</p>
        </div>
        <div className=" name-wrapper">
          <h5>{data.name}</h5>
          <p>{getLastMessage(currentUserData.email, data.messages)}</p>
        </div>
        <div className="time-wrapper">
          <p>{data.loggedTime}</p>
          <p className="notify-count">{notification}</p>
        </div>
      </div>
    </>
  );
};

export default UserItem;
