import { Link } from "react-router-dom";
export default function Signin() {
  return (
    <div id="wd-signin-screen" className="w-25">
      <h3>Sign in</h3>
      <input placeholder="username" id="wd-username" className="form-control mb-2" /> 
      <input placeholder="password" type="password" id="wd-password" className="form-control mb-2" />
      <Link  to="/Kambaz/Dashboard" className="btn btn-primary w-100" id="wd-signin-btn"> Sign in </Link>
      <Link  to="/Kambaz/Account/Signup"  id="wd-signup-link">Sign up</Link>
    </div>
);}
