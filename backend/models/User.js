import mongoose from "mongoose"
import validator from "validator"

const Schema = mongoose.Schema
const userScema = new Schema(
	{
		firstName: String,
		lastName: String,
		email: {
			type: String,
			unique: true,
			validate: {
				validator: function (email) {
					return validator.isEmail(email)
				},
				message: (props) => `${props.value} is not a valid Email!`,
			},
			required: [true, "User email required"],
		},
		password: {
			type: String,
			required: [true, "User email required"],
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		photo: {
			type: String,
		},
	},
	{ timestamps: true }
)

export default mongoose.model("User", userScema)
