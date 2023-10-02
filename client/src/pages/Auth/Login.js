import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Google from './google';
import jwt_decode from 'jwt-decode';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSuccess = (credentialResponse) => {
    const details = jwt_decode(credentialResponse.credential)
    console.log("test",details)
    console.log('Google login success:', credentialResponse);
    navigate('/');
  };

  const handleError = (error) => {
    console.error('Google login error:', error);
    // Handle login error here if needed
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://ssdtest.onrender.com/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            LOGIN
          </button>

          <br></br><br></br>

          <p><center>OR</center></p>

          {/* Google OAuth Login */}
          <div className="App">
            <header className="App-header">
              <GoogleOAuthProvider clientId="226258442736-4r6nah4qu5ptppnetjvt0lr953sknucv.apps.googleusercontent.com">
                <Google onSuccess={handleSuccess} onError={handleError} />
              </GoogleOAuthProvider>
            </header>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;



