const express = require("express");
const router = express.Router();
const Activities = require("../models/activities");
const auth = require("../middleware/auth");


router.get("/activities", auth, async (req, res) => {
  try {
    const act = await Activities.findOne({ user: req.user.userid });

    if (!act) {
      res.status(404).json({ message: "no activities found" });
    }

    res.json(act);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/add-activity", auth, async (req, res) => {
  try {

    const act = await Activities.findOne({ user: req.user.userid });

    if (!act) {
      res.status(404).json({ message: "no activities found" });
    }

    const anActivity = {
        title: req.body.title,
        category: req.body.category
    }

    act.userActivities.push(anActivity);

    await act.save();

    res.status(201).json({ message: "activity added" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;