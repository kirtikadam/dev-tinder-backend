const express = require("express");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequests");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid request status type " + status);
      }

      // check if user exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("User not found");
      }

      // if there is any existing connection request from A->B OR B->A then dont allow new request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        throw new Error("Connection request already exists!");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();
      res.json({
        message:
          status === "interested"
            ? "Connection request sent successfully."
            : "Connection request ignored successfully.",
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

// Logic to check
 // User1 => User2
      // Is User2 the logged in user = toUserId
      // Is status = interested
      // allowed status check
      // is loggedInUser appropriate user
      // requestId should be valid
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user; // toUserId
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid request status type " + status);
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: 'interested'
      })
      if(!connectionRequest) {
        throw new Error("Connection request not found");
      }

      connectionRequest.status = status
      const data = await connectionRequest.save()

      res.json({message: "Connection request " + status, data: data})
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

module.exports = requestRouter;
