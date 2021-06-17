import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
}; // 체크. 위에 variant와 children이 들어가서 쓰는게 기가막힘
// HomeScreen에서 <Message varinant ='danger'>{error} </Message>
//위와 같이 썼다. 즉 상황에 따라서 메시지를 바꿀수가 있게끔 설정한것

Message.defaultProps = {
  variant: "info",
};

export default Message;
