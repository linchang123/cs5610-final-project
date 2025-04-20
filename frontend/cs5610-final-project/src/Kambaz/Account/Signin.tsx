import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Dashboard");
    } catch (err: any) {
      setError("Signin failed. Please try again.");
      console.error("Signin error:", err);
    }
  };

  return (
    <div className="w-25">
      <h3>Sign in</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <input className="form-control mb-2" placeholder="username"
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
      <input type="password" className="form-control mb-2" placeholder="password"
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      <button className="btn btn-primary w-100" onClick={signin}>Sign in</button>
      <Link to="/Kambaz/Account/Signup">Sign up</Link>
    </div>
  );
}