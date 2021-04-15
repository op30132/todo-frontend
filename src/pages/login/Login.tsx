import React, { FunctionComponent } from "react";
import GoogleLogin from "react-google-login";

const Login: FunctionComponent<Record<string, unknown>> = () => {
  const handleLogin = async (googleData: any) => {
    const res = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    // store returned user somehow
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID as "string"}
      onSuccess={handleLogin}
      onFailure={handleLogin}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    >
      <span> SignIn with Google</span>
    </GoogleLogin>
  );
};

Login.propTypes = {

};

export default Login;