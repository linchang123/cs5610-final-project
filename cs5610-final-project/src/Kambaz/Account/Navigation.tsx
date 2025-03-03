import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {/* <Link className="list-group-item active border border-0" to={`/Kambaz/Account/Signin`}  > Signin  </Link> <br/>
      <Link className="list-group-item text-danger border border-0" to={`/Kambaz/Account/Signup`}  > Signup  </Link> <br/>
      <Link className="list-group-item text-danger border border-0" to={`/Kambaz/Account/Profile`} > Profile </Link> <br/> */}
      {links.map((link) => (
        <Link to={`/Kambaz/Account/${link}`} className={`list-group-item border border-0
              ${pathname.includes(link) ? "active" : "text-danger"}`}>
          {link}
        </Link>
      ))}

    </div>
);}