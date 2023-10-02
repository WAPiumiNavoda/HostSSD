import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track if password input is focused
  const navigate = useNavigate();

  // Password validation functions
  const validatePassword = (newPassword) => {
    const lowercaseRegex = /[a-z]/g;
    const uppercaseRegex = /[A-Z]/g;
    const numberRegex = /[0-9]/g;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;

    const isLowercaseValid = lowercaseRegex.test(newPassword);
    const isUppercaseValid = uppercaseRegex.test(newPassword);
    const isNumberValid = numberRegex.test(newPassword);
    const isSpecialCharValid = specialCharRegex.test(newPassword);
    const isLengthValid = newPassword.length >= 8;

    return {
      isLowercaseValid,
      isUppercaseValid,
      isNumberValid,
      isSpecialCharValid,
      isLengthValid,
    };
  };

  // State to track password validation
  const [passwordValidation, setPasswordValidation] = useState({
    isLowercaseValid: false,
    isUppercaseValid: false,
    isNumberValid: false,
    isSpecialCharValid: false,
    isLengthValid: false,
  });

  // Function to handle password change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const validation = validatePassword(newPassword);
    setPasswordValidation(validation);
  };

  // Function to handle input focus
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  // Function to handle input blur
  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  // Form function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password meets the requirements
    const {
      isLowercaseValid,
      isUppercaseValid,
      isNumberValid,
      isSpecialCharValid,
      isLengthValid,
    } = passwordValidation;

    if (
      !isLowercaseValid ||
      !isUppercaseValid ||
      !isNumberValid ||
      !isSpecialCharValid ||
      !isLengthValid
    ) {
      toast.error("Password does not meet requirements");
      return;
    }

    try {
      const res = await axios.post("https://ssdtest.onrender.com/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // CSS for styling the password input and validation message
    const passwordInputStyle = {
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "10px",
      width: "100%",
      marginBottom: "10px",
    };

    const validationMessageStyle = {
      display: isPasswordFocused ? "block" : "none",
      background: "#f9f9f9",
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "10px",
      marginTop: "5px",
      width: "100%",
      textAlign: "left",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    };

  // return (
  //   <Layout title="Register - Ecommerce App">
  //     <div className="form-container" style={{ minHeight: "90vh" }}>
  //       <form onSubmit={handleSubmit}>
  //         <h4 className="title">REGISTER FORM</h4>
  //         <div className="mb-3">
  //           <input
  //             type="text"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //             className="form-control"
  //             id="exampleInputEmail1"
  //             placeholder="Enter Your Name"
  //             required
  //             autoFocus
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <input
  //             type="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             className="form-control"
  //             id="exampleInputEmail1"
  //             placeholder="Enter Your Email "
  //             required
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <input
  //             type="password"
  //             value={password}
  //             onChange={handlePasswordChange}
  //             onFocus={handlePasswordFocus}
  //             onBlur={handlePasswordBlur}
  //             className="form-control"
  //             id="exampleInputPassword1"
  //             placeholder="Enter Your Password"
  //             required
  //           />
  //           {isPasswordFocused && (
  //             <div id="message">
  //               <h3>Password must contain the following:</h3>
  //               <p
  //                 id="letter"
  //                 className={
  //                   passwordValidation.isLowercaseValid ? "valid" : "invalid"
  //                 }
  //               >
  //                 A <b>lowercase</b> letter{" "}
  //                 {passwordValidation.isLowercaseValid ? "": ""}
  //               </p>
  //               <p
  //                 id="capital"
  //                 className={
  //                   passwordValidation.isUppercaseValid ? "valid" : "invalid"
  //                 }
  //               >
  //                 A <b>capital (uppercase)</b> letter{" "}
  //                 {passwordValidation.isUppercaseValid ?"":""}
  //               </p>
  //               <p
  //                 id="number"
  //                 className={
  //                   passwordValidation.isNumberValid ? "valid" : "invalid"
  //                 }
  //               >
  //                 A <b>number</b>{" "}
  //                 {passwordValidation.isNumberValid ? "" : ""}
  //               </p>
  //               <p
  //                 id="special-char"
  //                 className={
  //                   passwordValidation.isSpecialCharValid ? "valid" : "invalid"
  //                 }
  //               >
  //                 A <b>special character</b>{" "}
  //                 {passwordValidation.isSpecialCharValid ? "" : ""}
  //               </p>
  //               <p
  //                 id="length"
  //                 className={
  //                   passwordValidation.isLengthValid ? "valid" : "invalid"
  //                 }
  //               >
  //                 Minimum <b>8 characters</b>{" "}
  //                 {passwordValidation.isLengthValid ? "" : ""}
  //               </p>
  //             </div>
  //           )}
  //         </div>
  //         <div className="mb-3">
  //           <input
  //             type="text"
  //             value={phone}
  //             onChange={(e) => setPhone(e.target.value)}
  //             className="form-control"
  //             id="exampleInputEmail1"
  //             placeholder="Enter Your Phone"
  //             required
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <input
  //             type="text"
  //             value={address}
  //             onChange={(e) => setAddress(e.target.value)}
  //             className="form-control"
  //             id="exampleInputEmail1"
  //             placeholder="Enter Your Address"
  //             required
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <input
  //             type="text"
  //             value={answer}
  //             onChange={(e) => setAnswer(e.target.value)}
  //             className="form-control"
  //             id="exampleInputEmail1"
  //             placeholder="What is Your Favorite sports"
  //             required
  //           />
  //         </div>
  //         <button type="submit" className="btn btn-primary">
  //           REGISTER
  //         </button>
  //       </form>
  //     </div>
  //   </Layout>
  // );

  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
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
              onChange={handlePasswordChange}
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
            {isPasswordFocused && (
              <div id="message" style={validationMessageStyle}>
                <h3>Password must contain the following:</h3>
                <p
                  id="letter"
                  className={
                    passwordValidation.isLowercaseValid ? "valid" : "invalid"
                  }
                >
                  A <b>lowercase</b> letter{" "}
                  {passwordValidation.isLowercaseValid ? "✔" : ""}
                </p>
                <p
                  id="capital"
                  className={
                    passwordValidation.isUppercaseValid ? "valid" : "invalid"
                  }
                >
                  A <b>capital (uppercase)</b> letter{" "}
                  {passwordValidation.isUppercaseValid ? "✔" : ""}
                </p>
                <p
                  id="number"
                  className={
                    passwordValidation.isNumberValid ? "valid" : "invalid"
                  }
                >
                  A <b>number</b>{" "}
                  {passwordValidation.isNumberValid ? "✔" : ""}
                </p>
                <p
                  id="special-char"
                  className={
                    passwordValidation.isSpecialCharValid ? "valid" : "invalid"
                  }
                >
                  A <b>special character</b>{" "}
                  {passwordValidation.isSpecialCharValid ? "✔" : ""}
                </p>
                <p
                  id="length"
                  className={
                    passwordValidation.isLengthValid ? "valid" : "invalid"
                  }
                >
                  Minimum <b>8 characters</b>{" "}
                  {passwordValidation.isLengthValid ? "✔" : ""}
                </p>
              </div>
            )}
          </div>
         <div className="mb-3">
         <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is Your Favorite sports"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );


};

export default Register;