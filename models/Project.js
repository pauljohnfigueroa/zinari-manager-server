import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
	{
		name: {
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
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Team'
			}
		],
		manager: String,
		dueDate: String
	},
	{
		timestamps: true
	}
)

const Project = mongoose.model('Project', ProjectSchema)
export default Project
