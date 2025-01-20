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
// app.get(/a/, (req, res) => {
//   res.send({ firstname: "Kirti", lastname: "Kadam" });
// });

// USE QUERY PARAMS --- http://localhost:4000/test?testId=3006&code=12345
// app.get("/test", (req, res) => {
//   console.log("QUERY PARAMS = ", req.query);
//   res.send({ firstname: "Kirti", lastname: "Kadam" });
// });

// USE DYNAMIC ROUTES ---- http://localhost:4000/test/3006/12345
// app.get("/test/:testId/:code", (req, res) => {
//   console.log("DYNAMIC ROUTES = ", req.params);
//   res.send({ firstname: "Kirti", lastname: "Kadam" });
// });

//---------------------------------------------------------------
// app.use("/", (req, res) => {
//   res.send("Hello...!!");
// });

//-----------------------------MIDDLEWARE----------------------------------
// app.use(
//   "/user",
//   (req, res, next) => {
//     //middleware
//     console.log("1st handler called");
//     next(); // provided by express JS
//     // res.send("Response");
//   }
// );

// app.get("/user", (req, res, next) => {
//   //middleware
//   console.log("handling /user route")
//   next()
// }, (req, res, next) => {
//   // route handler
//   res.send("1st route handler")
// }, (req, res, next) => {
//   res.send("2nd route handler")
// })

//-----------------------------WHY MIDDLEWARE REQUIRED----------------------------------
const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle auth middleware for all requests GET, POST, PATCH, DELETE
app.use("/admin", adminAuth);

app.post("/login", (req, res) => {
  res.send("Logged in successfully")
})

app.get("/user/data", userAuth, (req, res) => {
  res.send("Getting user data")
})

app.get("/admin/getAllData", (req, res, next) => {
  // Logic of fetching all data from DB
  res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res, next) => {
  // Logic delete user
  res.send("Deleted User");
});

app.listen(4000, () => {
  console.log("Server up...");
});
