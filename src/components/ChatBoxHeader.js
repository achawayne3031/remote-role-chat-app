import { getFirstLetter } from "../util/funcHelper";
import "./../styles/chat-box-header.scss";

const ChatBoxHeader = ({ data }) => {
  return (
    <>
      <div className="d-flex header-wrapper">
        <div className="logo-wrapper">
          <p className="logo">{getFirstLetter(data.name)}</p>
        </div>
        <div className=" name-wrapper">
          <h5>{data.name}</h5>
          <p>{data.email}</p>
        </div>
      </div>
    </>
  );
};

export default ChatBoxHeader;
