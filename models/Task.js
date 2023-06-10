import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			max: 100
		},
		description: {
			type: String,
			max: 200
		},
		comments: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Comment'
			}
		],
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
