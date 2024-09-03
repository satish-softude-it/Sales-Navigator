import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleSignIn() {
const [state, setstate] = useState({})
    return (
<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/>    );
}
export default GoogleSignIn;