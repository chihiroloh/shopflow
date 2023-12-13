import React, { useContext, useState } from "react";
import UserContext from "../context/user";
import { useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); // Initialize the history object

  const handleLogin = async () => {
    const res = await fetchData("/api/auth/login", "POST", { email, password }); // Update the API endpoint

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const decoded = jwtDecode(res.data.access);
      userCtx.setRole(decoded.role);

      // Redirect to a protected route or dashboard
      history.push("/dashboard"); // Replace "/dashboard" with the actual route
    } else {
      alert(JSON.stringify(res.data));
    }
  };
  return (
    <>
      <br />
      <div className="row">
        <div className="col-md-4"></div>
        <input
          type="text"
          className="col-md-4"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <input
          type="password"
          className="col-md-4"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <button className="col-md-4" type="submit" onClick={handleLogin}>
          login
        </button>
        <div className="col-md-4"></div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4"></div>
        <button
          className="col-md-4"
          type="submit"
          onClick={() => props.setShowLogin(false)}
        >
          go to registration screen
        </button>
        <div className="col-md-4"></div>
      </div>
    </>
  );
};

export default Login;
