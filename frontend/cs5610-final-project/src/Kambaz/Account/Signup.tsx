import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "", role: "STUDENT" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Dashboard");
    } catch (err: any) {
      setError("Signup failed. Username may already be taken.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="w-25">
      <h3>Sign up</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input className="form-control mb-2" placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })} />
      <input type="password" className="form-control mb-2" placeholder="password"
        onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <select className="form-control mb-2"
        onChange={(e) => setUser({ ...user, role: e.target.value })}>
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
      </select>
      <button className="btn btn-primary w-100" onClick={signup}>Sign up</button>
      <Link to="/Kambaz/Account/Signin">Sign in</Link>
    </div>
  );
}