const mongoose = require('mongoose');
const { string, number } = require('yup');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter username"]
        },

        email: {
            type: String,
            required: [true, "Please enter email"]
        },

        password: {
            type: String,
            required: [true, "Please enter email"]
        },

        age: {
            type: Number,
            required: [true, "Please enter age"]
        },

        score: {
            type: Number,
            required: [true, "Please enter your CP score"]
        },

        github: {
            type: String,
            required: [true, "Please enter your Github Link"]
        },

        problems_saved: {
            type: Number,
            required: false,
            default: 0
        },

        problems_solved: {
            type: String,
            required: false,
            default: ""
        },
        verified: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
);

UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("User", UserSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		age: Joi.number().required().label("Age"),
        score: Joi.number().required().label("Score"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
        github: Joi.string().required().label("Github"),
        problems_saved: Joi.number().required().label("psaved"),
        problems_solved: Joi.string().required().label("psolved"),
        // image: Joi.string().required().label("image"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };