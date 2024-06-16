const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cmmtSchema = mongoose.Schema({
	question:{
        type: String,
		required: true,
    },

    cmt: {
		type: String,
		required: true,
	},
});

const Cmmt = mongoose.model("Cmmt", cmmtSchema);

module.exports = Cmmt;