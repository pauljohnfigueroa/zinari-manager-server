import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			max: 50
		},
		description: {
			type: String,
			max: 200
		},
		teams: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Team'
			}
		],
		manager: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		dueDate: String
	},
	{
		timestamps: true
	}
)

const Project = mongoose.model('Project', ProjectSchema)
export default Project
