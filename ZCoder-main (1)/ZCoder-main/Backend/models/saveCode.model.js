const mongoose = require('mongoose');
const { string, number } = require('yup');

const codeSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: [true, "Please enter name"]
        },

        email: {
            type:String,
            required: [true, "Please enter email"]
        },
        question: {
            type: String,
            required: [true, "Please enter question"]
        },

        solution: {
            type: String,
            required: [true, "Please enter solution"]
        },
        tag: {
            type: String,
            required: [true, "Please select a tag"]
        }
    },
    {
        timestamps: true
    }
);

const sCode = mongoose.model("sCode", codeSchema);

module.exports = sCode;