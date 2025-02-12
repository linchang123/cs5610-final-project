import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import { Row, Col } from "react-bootstrap";

export default function Account() {
  return (
    <div id="wd-account-screen">
      <Row>
        <Col xs={1}>
          <AccountNavigation />
        </Col>
        <Col xs={11}>
            <Routes>
                <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
                <Route path="/Signin" element={<Signin />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Signup" element={<Signup />} />
            </Routes>
        </Col>
      </Row>
    </div>
);}
