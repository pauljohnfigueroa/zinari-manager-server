import mongoose from 'mongoose'
import Task from '../models/Task.js'
import User from '../models/User.js'

/* 
    April 7, 2023
    Create a task.
*/
export const createTask = async (req, res) => {
	try {
		// coming from the add task user form in the front end
		const { title, description, project, team, owner, priority, perspective, dueDate } = req.body

		const ownerId = owner.split('|')[0]
		const newTask = new Task({
			title,
			description,
			comments: [],
			project,
			team,
			owner: ownerId,
			priority,
			perspective,
			status: 'new',
			dueDate
		})
		// save new task
		const savedTask = await newTask.save()

		// response
		res.status(201).json(savedTask)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/* 
    April 7, 2023
    Get a single task from the database using the id parameter.
*/
export const getTask = async (req, res) => {
	try {
		// get the task's id from the parameters
		const { id } = req.params
		// use the id to find the user and exclude the password
		const task = await Task.findById(id)
		// to exclude the password, you can also do it this way.
		// task.password = undefined

		// send task data to front-end
		res.status(200).json(task)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const getUserTasks = async (req, res) => {
	try {
		const { userId } = req.body
		// find tasks with owner of userId
		const tasks = await Task.find({ owner: new mongoose.Types.ObjectId(userId) })
		// send task data to front-end
		res.status(200).json(tasks)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const getTeamTasks = async (req, res) => {
	try {
		const { teamId } = req.params
		// find tasks with owner of userId
		const tasks = await Task.find({ team: new mongoose.Types.ObjectId(teamId) })
		// send task data to front-end
		console.log(tasks)
		res.status(200).json(tasks)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const updateTask = async (req, res) => {
	const { id } = req.params

	try {
		// check if _id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such ID.' })
		}

		const task = await Task.findByIdAndUpdate({ _id: id }, { ...req.body })
		if (!task) return res.status(400).json({ error: 'No such task.' })

		res.status(200).json(task)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const deleteTask = async (req, res) => {
	const { id } = req.params

	try {
		// check if _id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such ID.' })
		}

		const task = await Task.findByIdAndDelete({ _id: id })
		if (!task) return res.status(400).json({ error: 'No such task.' })

		res.status(200).json(task)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const createComment = async (req, res) => {
	try {
		const { taskId, userId, comment } = req.body
		console.log(taskId, userId, comment)
		const newComment = await Task.updateOne(
			{ _id: new mongoose.Types.ObjectId(taskId) },
			{
				$currentDate: { lastModified: true },
				$push: { comments: { comment, user: userId } }
			}
		)

		console.log('newComment', newComment)

		res.status(200).json(newComment)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
