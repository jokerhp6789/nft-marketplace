import "./userAvtComponent.scss";

import {BsCheckLg} from "react-icons/bs";

const UserAvtComponent = ({
                            userAvt,
                            isVerify
                          }) => {
  return (
    <div className="user-avt__container">
      <img src={userAvt} alt=""/>
      <div className={`user-avt__verify ${isVerify && "is-verify"}`}>
        <BsCheckLg/>
      </div>
    </div>
  );
};

export default UserAvtComponent;