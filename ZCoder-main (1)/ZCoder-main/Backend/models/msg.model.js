const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const msgSchema = mongoose.Schema({
	name:{
        type: String,
		required: true,
    },

    chat: {
		type: String,
		required: true,
	},

	email:{
		type: String,
		required: true,
	}
});

const Msg = mongoose.model("Msg", msgSchema);

module.exports = Msg;