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
			max: 200
		},
		comments: [
			{
				comment: {
					type: String,
					required: true
				},
				user: {
					type: Array,
					required: true,
					ref: 'User'
				}
			}
		],
		project: mongoose.Schema.Types.ObjectId,
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
