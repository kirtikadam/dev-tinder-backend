const adminAuth = (req, res, next) => {
  // auth middleware
  // Logic of checking if the request is  authorized
  console.log("admin auth getting checked");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  // auth middleware
  // Logic of checking if the request is  authorized
  console.log("USER auth getting checked");
  const token = "ABC";
  const isAdminAuthorized = token === "ABC";
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth
}