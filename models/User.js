import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 50
		},
		middleName: {
			type: String,
			min: 2,
			max: 50
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 50
		},
		extName: {
			type: String,
			min: 1,
			max: 15
		},
		email: {
			type: String,
			required: true,
			min: 2,
			max: 50
		},
		phone: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			required: false
		},
		photo: {
			type: String,
			required: false
		},
		department: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Department'
			}
		],
		branch: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Branch'
			}
		],
		digitalSignature: String,
		createdBy: String
	},
	{
		timestamps: true
	}
)

const User = mongoose.model('User', UserSchema)

export default User
