import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = "134120015958-tll390n53pfe1jeeva7mstkhcb4cifnk.apps.googleusercontent.com" // Replace with your actual Google Client ID

const GoogleSignIn = () => {
  const googleSuccess = (response) => {
    console.log('Google Sign In success:', response);
    // You can handle the Google sign-in success here.
  };

  const googleFailure = (response) => {
    console.log('Google Sign In failure:', response);
    // You can handle the Google sign-in failure here.
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign In with Google"
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleSignIn;
