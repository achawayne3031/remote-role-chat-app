import { getFirstLetter } from "../util/funcHelper";
import "./../styles/user-profile.scss";

const UserProfile = ({ data, onClick }) => {
  return (
    <>
      <div className="profile-wrapper">
        <span className="fa fa-remove close-icon" onClick={onClick}></span>
        <div className="profile-content">
          <div className="logo-wrapper">
            <p className="logo">{getFirstLetter(data.name)}</p>
          </div>
          <div className="name-wrapper">
            <h5>{data.name}</h5>
            <p>{data.phone}</p>
            <p>{data.email}</p>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default UserProfile;
