const express = require("express");
const Notification = require("../models/notification");
const { default: mongoose } = require("mongoose");
const router = express.Router();

//return all of my notifications
router.get("/getNotifications/:recepId", async (req, res) => {
  try {
    const notification = await Notification.find({
      RECEP_USER_ID: req.params.recepId,
    })
      .populate("SENDER_USER_ID")
      .sort({ createdAt: -1 });

    console.log(notification);
    res.send(notification);
  } catch (error) {
    console.log(error);
  }
});

router.post("/sendNotification", async (req, res) => {
  try {
    const notification = new Notification({
      RECEP_USER_ID: mongoose.Types.ObjectId(req.body.RECEP_USER_ID),
      SENDER_USER_ID: mongoose.Types.ObjectId(req.body.SENDER_USER_ID),
      NOTIF_TYPE: req.body.NOTIF_TYPE,
      BODY: req.body.BODY,
    });
    await notification.save();
    res.send(notification);
    console.log("notification sent");
  } catch (error) {
    console.log(error);
  }
});

//find following notification
router.get(
  "/getFollowingNotification/:senderId/:receptId",
  async (req, res) => {
    try {
      const notification = await Notification.findOne({
        RECEP_USER_ID: req.params.receptId,
        SENDER_USER_ID: req.params.senderId,
        NOTIF_TYPE: 0,
      });

      console.log(notification);
      res.send(notification);
    } catch (error) {
      console.log(error);
    }
  }
);

//update notification to read
router.patch("/makeNotificationRead/:notifId",  (req, res) => {
    Notification.updateOne({ _id: req.params.notifId }, {VIEWED: true})
      .then(res => {
        res.send(result);
      })
      .catch(err => {console.log(err)});
  });

//delete by notification id
router.delete("/deleteNotification/:id", (req, res) => {
  const id = req.params.id;

  Notification.findByIdAndDelete(id)
    .then((result) => {
      console.log("notification deleted");
      res.send("notification deleted");
    })
    .catch((err) => {
      console.log(err);
    });
}); // delete all comments

module.exports = router;
