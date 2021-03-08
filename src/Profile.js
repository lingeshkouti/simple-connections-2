import React from "react";
import "./Profile.css";

const Profile = (props) => {
  const { name, email, address, picture} = props;
  return (
    <div className="card">
      <div className="image">
        <img src={picture} alt="" />
      </div>
      <div className="content">
        <div className="header">{name}</div>
        <div className="description">{address}</div>
      </div>
      <div className="extra content">
        <span className="left floated">{email}</span>
      </div>
    </div>
  );
};

export default Profile;
