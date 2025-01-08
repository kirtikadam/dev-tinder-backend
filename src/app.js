const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from dashboard...!!");
});

app.use("/", (req, res) => {
    res.send("Hello...!!");
  });

app.listen(4000, () => {
  console.log("Server up...");
});
