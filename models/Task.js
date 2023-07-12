import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			max: 100
		},
		description: {
			type: String,
			max: 500
		},
		comments: [
			{
				comment: {
					type: String
				},
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User'
				},
				lastModified: {
					type: String
				}
			}
		],
		project: mongoose.Schema.Types.ObjectId,
		team: mongoose.Schema.Types.ObjectId,
		owner: mongoose.Schema.Types.ObjectId,
		priority: String,
		perspective: String,
		status: String,
		dueDate: String
	},
	{
		timestamps: true
	}
)

const Task = mongoose.model('Task', TaskSchema)
export default Task
