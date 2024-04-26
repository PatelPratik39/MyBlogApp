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
  box-shadow: 0 2px 4px 0;
  ${"" /* box-shadow: 0 8px 8px 0 rgb(0 0 0/ 20%); */}
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
  color: "#878787";
  font-size: 14px;
`;
const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

// to solve field errors
const signupInitialValues = {
  firstName: "",
  lastName: "",
  username: "",
  password: ""
};

const Login = () => {
  const [account, setAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState("");

  const toggleSignup = () => {
    account === "signup" ? setAccount("login") : setAccount("signup");
  };

  const onInputChange = (e) => {
    e.preventDefault();
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const signupUser = async () => {

  };
  return (
    <>
      <Component>
        <Box>
          <Image src={image} alt="blogzz" />
          {account === "login" ? (
            <Wrapper>
              <TextField
                onChange={(e) => onInputChange(e)}
                label="Username"
                name="username"
                variant="standard"
              />

              <TextField
                onChange={(e) => onInputChange(e)}
                label="Password"
                name="password"
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
                label="First Name"
                name="firstName"
                variant="standard"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                label="Last Name"
                name="lastName"
                variant="standard"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                label="Username"
                name="username"
                variant="standard"
                onChange={(e) => onInputChange(e)}
              />
              <TextField
                label="Password"
                name="password"
                variant="standard"
                onChange={(e) => onInputChange(e)}
              />
              {error && <Error>{error}</Error>}
              <SignupButton variant="contained" onClick={() => signupUser()}>
                SignUp
              </SignupButton>
              <Text style={{ textAlign: "center" }}>
                {" "}
                Already have an Account?{" "}
              </Text>
              <LoginButton onClick={() => toggleSignup()}>Login</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </>
  );
};
export default Login;
