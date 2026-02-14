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
        catValue: req.body.catValue,
        category: req.body.category
    }

    act.userActivities.push(anActivity);

    await act.save();

    res.status(201).json({ message: "activity added" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/weekly", auth, async (req, res) => {
    try{
        const act = await Activities.findOne({ user: req.user.userid });

        if(!act){
            return res.status(404).json({
                success: false,
                message: "No activities found"
            });
        }

        let activities = act.userActivities;

        let categoryTotals = [
            { cat: "Dietary", total: 0 },
            { cat: "Digital", total: 0 },
            { cat: "Water", total: 0 },
            { cat: "Transportation", total: 0 },
            { cat: "Electricity", total: 0 },
            { cat: "Waste", total: 0 },
            ];

        const filtered = activities.filter((ac) => isWithinWeek(ac.createdAt));
        const weeklyTotal = filtered.reduce((acc, v) => acc + v.catValue, 0);

         for (let i = 0; i < filtered.length; i++) {
            for (let j = 0; j < categoryTotals.length; j++) {
                if (
                categoryTotals[j].cat.toLowerCase() ===
                filtered[i].category.toLowerCase()
                ) {
                categoryTotals[j].total += filtered[i].catValue;
                break;
                }
            }
            }

    res.send({ total: weeklyTotal, activities: filtered, categoryTotals });
    }
    catch(error){
      res.status(500).json({
      success: false,
      message: error.message
    });
    }
});

function isWithinWeek(date) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return date >= sevenDaysAgo;
}





module.exports = router;