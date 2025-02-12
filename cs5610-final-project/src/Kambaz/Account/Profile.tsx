import { Link } from "react-router-dom";
import {FormSelect} from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="w-25">
      <h3>Profile</h3>
      <input defaultValue="alice" placeholder="username" id="wd-username" className="form-control mb-2"/>
      <input defaultValue="123"   placeholder="password" type="password"
             className="form-control mb-2" id="wd-password"/>
      <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" className="form-control mb-2"/>
      <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" className="form-control mb-2"/>
      <input defaultValue="2000-01-01" type="date" id="wd-dob" className="form-control mb-2" />
      <input defaultValue="alice@wonderland" type="email" id="wd-email" className="form-control mb-2" />
      <FormSelect defaultValue="FACULTY" id="wd-role">
        <option value="USER">User</option>       
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> 
        <option value="STUDENT">Student</option>
      </FormSelect><br/>
      <Link className="btn btn-primary w-100" to="/Kambaz/Account/Signin" >Sign out</Link>
    </div>
);}
