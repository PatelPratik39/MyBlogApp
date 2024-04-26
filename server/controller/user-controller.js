import User from "../model/user.js";

// first API
export const signupUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    await newUser.save();
    return res.satus(200).json({ message: "SignUp Successful!!" });
  } catch (error) {
    return res.satus(500).json({ message: "Error while creating the User!!" });
  }
};
