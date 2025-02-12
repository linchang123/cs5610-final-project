import { Link } from "react-router-dom";
export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link className="list-group-item active border border-0" to={`/Kambaz/Account/Signin`}  > Signin  </Link> <br/>
      <Link className="list-group-item text-danger border border-0" to={`/Kambaz/Account/Signup`}  > Signup  </Link> <br/>
      <Link className="list-group-item text-danger border border-0" to={`/Kambaz/Account/Profile`} > Profile </Link> <br/>
    </div>
);}
