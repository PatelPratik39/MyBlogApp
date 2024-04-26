import React from "react";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import image from "../../assets/blogzz.png";
import { useState } from "react";
// import "./Login.css";

// div
const Component = styled(Box)`
  width: 600px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;
// img
const Image = styled(`img`)({
  width: "100px",
  margin: "auto",
  display: "flex",
  padding: "50px 0 0"
});
// Box
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

// Login Button
const LoginButton = styled(Button)`
  text-transform: none;
  height: 48px;
  border-radius: 10px;
  box-shadow: 0 8px 8px 0 rgb(0 0 0/ 20%);
`;
// Signup Button
const SignupButton = styled(Button)`
  text-transform: none;
  height: 48px;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0;
`;
// Typography
const Text = styled(Typography)`
  color: '#878787';
  font-size: 14px;
`;

const Login = () => {
  const [account, setAccount] = useState("login");

  const toggleSignup = () => {
    account === "signup" ? setAccount("login") : setAccount("signup");
  };
  return (
    <>
      <Component>
        <Box>
          <Image src={image} alt="blogzz" />
          {account === "login" ? (
            <Wrapper>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="standard"
              />

              <TextField
                id="outlined-basic"
                label="Password"
                variant="standard"
              />

              <LoginButton variant="contained">Login</LoginButton>
              <Text style={{ textAlign: "center" }}>
                {" "}
                Don't have an Account?{" "}
              </Text>
              <SignupButton onClick={() => toggleSignup()}>
                Create an Account
              </SignupButton>
            </Wrapper>
          ) : (
            <Wrapper>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="standard"
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="standard"
              />
              <TextField
                id="outlined-basic"
                label="Username"
                variant="standard"
              />

              <TextField
                id="outlined-basic"
                label="Password"
                variant="standard"
              />

              <LoginButton variant="contained">SignUp</LoginButton>
              <Text style={{ textAlign: "center" }}> Already an Account? </Text>
              <SignupButton onClick={() => toggleSignup()}>
               Login
              </SignupButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </>
  );
};
export default Login;
