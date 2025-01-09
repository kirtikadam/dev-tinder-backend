const express = require("express");

const app = express();
//---------------------------------------------------------------
// This will handle ONLY post API calls to /test
// app.post("/test", (req, res) => {
//   res.send("Save successfully");
// });

// // This will handle ONLY get API calls to /test
// app.get("/test", (req, res) => {
//   res.send({ firstname: "Kirti", lastname: "Kadam" });
// });

// // This will handle ONLY delte API calls to /test
// app.delete("/test", (req, res) => {
//   res.send("DELETED Successfully");
// });

// This will match all the HTTP method API calls to /test
// app.use("/test", (req, res) => {
//   res.send("Hello from dashboard...!!");
// });
//---------------------------------------------------------------

// ADVANCE ROUTES
//---------------------------------------------------------------
// USE REGEX ---- any url with containing a
app.get(/a/, (req, res) => {
  res.send({ firstname: "Kirti", lastname: "Kadam" });
});

// USE QUERY PARAMS --- http://localhost:4000/test?testId=3006&code=12345
app.get("/test", (req, res) => {
  console.log("QUERY PARAMS = ", req.query);
  res.send({ firstname: "Kirti", lastname: "Kadam" });
});

// USE DYNAMIC ROUTES ---- http://localhost:4000/test/3006/12345
// app.get("/test/:testId/:code", (req, res) => {
//   console.log("DYNAMIC ROUTES = ", req.params);
//   res.send({ firstname: "Kirti", lastname: "Kadam" });
// });

//---------------------------------------------------------------
// app.use("/", (req, res) => {
//   res.send("Hello...!!");
// });

app.listen(4000, () => {
  console.log("Server up...");
});
