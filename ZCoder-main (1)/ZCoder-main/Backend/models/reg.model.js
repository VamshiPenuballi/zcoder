const mongoose = require('mongoose');
const { string, number } = require('yup');

const RegSchema = mongoose.Schema(
    {
        name: {
            type: string,
            required: [true, "Please enter username"]
        },

        email: {
            type: string,
            required: [true, "Please enter email"]
        },

        age: {
            type: number,
            required: [true, "Please enter age"]
        },

        score: {
            type: number,
            required: [true, "Please enter your CP score"]
        },

        github: {
            type: string,
            required: [true, "Please enter your Github Link"]
        },

        problems_saved: {
            type: number,
            required: [false],
            default: 0
        },

        problems_solved: {
            type: number,
            required: [false],
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", RegSchema);

module.exports = User;