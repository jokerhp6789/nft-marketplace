import React, {useEffect, useState} from "react";
import {Toast, ToastContainer} from "react-bootstrap";

const ToastNoti = ({
                     errorMsg,
                     setErrMsg,
                     position,
                     titleNoti
                   }) => {
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (errorMsg) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setErrMsg({
          title: "",
          content: ""
        });
      }, 2000);
    }
  }, [errorMsg]);
  return (
    <ToastContainer className="p-3 toast-container"
                    position={position ? position : "bottom-end"} style={{zIndex: 1000}}>
      <Toast show={showToast}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{titleNoti ? titleNoti : "Error"}</strong>
        </Toast.Header>
        <Toast.Body>{errorMsg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNoti;