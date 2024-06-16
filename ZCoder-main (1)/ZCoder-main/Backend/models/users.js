const router = require("express").Router();
const { User, validate } = require("./user.model");
const Token = require("./token");
const crypto = require("crypto");
const sendEmail = require("./sendEmail");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

router.post("/", async (req, res) => {
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 1");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `http://localhost:5173/users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
    mongoose.connect("mongodb+srv://chiragcbsc:L6IHdbjn5oRgiUNL@zcproject.npyugf8.mongodb.net/?retryWrites=true&w=majority&appName=ZCProject", { useUnifiedTopology: true, useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true  })
    .then(() => {
        console.log("Connected to db 1");
    })
    .catch((e) => {
        console.log("failed connection");
        console.log(e);
    })
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await User.updateOne({ _id: user._id},{ verified: true });
		await token.remove();

		res.status(200).json({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;