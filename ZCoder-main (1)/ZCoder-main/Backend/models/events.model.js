const mongoose = require('mongoose');
const { string, number } = require('yup');

const EventSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter email"]
        },

        date: {
            type: String,
            required: [true, "Please enter date"]
        },

        Title: {
            type: String,
            required: [true, "Please enter title"]
        },

        Description: {
            type: String,
            required: [true, "Please enter description"]
        }
    },
    {
        timestamps: true
    }
);

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;