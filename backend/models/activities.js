const mongoose = require("mongoose");

const activitiesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user ID']
    },
    userActivities: [{
        title: String,
        category: String,
        createdAt: { type: Date, default: Date.now }
        }]
});

const Activities = mongoose.model('Activities', activitiesSchema);

module.exports = Activities;