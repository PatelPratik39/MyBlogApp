import express from "express";
import chalk from "chalk";
// import cors from "cors";
// import mongoose from "mongoose";

const app = express("express");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.magenta(`Server is rinning on PORT : ${PORT}`));
});
