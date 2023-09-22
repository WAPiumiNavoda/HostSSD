import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const Google = () => {
  const navigate = useNavigate();

  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        const details = jwt_decode(credentialResponse.credential)
        console.log("details",details)
        // console.log(credentialResponse);
        navigate('/');
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );

  
}

export default Google;
