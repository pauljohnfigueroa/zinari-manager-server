import mongoose from 'mongoose'
import Task from '../models/Task.js'

/* 
    April 7, 2023
    Create a task.
*/
export async function createTask(req, res) {
	try {
		// coming from the add task user form in the front end
		const { title, description, project, team, owner, priority, perspective, dueDate } = req.body

		console.log('dueDate', dueDate)

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
		console.log('error.message', error.message)
		res.status(500).json({ error: error.message })
	}
}

/* 
    April 7, 2023
    Get a single task from the database using the id parameter.
*/
export async function getTask(req, res) {
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

export async function getUserTasks(req, res) {
	try {
		const { userId } = req.body
		// find tasks with owner of userId
		// const tasks = await Task.find({ owner: new mongoose.Types.ObjectId(userId) })
		const tasks = await Task.aggregate([
			{
				$match: {
					owner: new mongoose.Types.ObjectId(userId)
				}
			},
			{
				$lookup: {
					from: 'users',
					localField: 'owner',
					foreignField: '_id',
					as: 'ownerDetails'
				}
			},
			{
				$unwind: {
					path: '$ownerDetails'
				}
			},
			{
				$lookup: {
					from: 'projects',
					localField: 'project',
					foreignField: '_id',
					as: 'projectDetails'
				}
			},
			{
				$unwind: {
					path: '$projectDetails'
				}
			},
			{
				$lookup: {
					from: 'teams',
					localField: 'team',
					foreignField: '_id',
					as: 'teamDetails'
				}
			},
			{
				$unwind: {
					path: '$teamDetails'
				}
			},
			{
				$set: {
					fname: '$ownerDetails.firstName',
					lname: '$ownerDetails.lastName',
					project: '$projectDetails.title',
					team: '$teamDetails.name'
				}
			},
			{
				$project: {
					_id: 1,
					title: 1,
					owner: {
						$concat: ['$fname', ' ', '$lname']
					},
					description: 1,
					perspective: 1,
					priority: 1,
					status: 1,
					dueDate: 1,
					project: 1,
					team: 1
				}
			}
		])

		// send task data to front-end
		console.log("user's tasks", tasks)
		res.status(200).json(tasks)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export async function getTeamTasks(req, res) {
	try {
		const { projectId, teamId } = req.params
		// find tasks based on project and team
		const tasks = await Task.find({
			project: new mongoose.Types.ObjectId(projectId),
			team: new mongoose.Types.ObjectId(teamId)
		})
		// send task data to front-end
		console.log('tasks', tasks)
		res.status(200).json(tasks)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export async function updateTask(req, res) {
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

export async function deleteTask(req, res) {
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

export async function createComment(req, res) {
	try {
		const { taskId, userId, comment } = req.body

		let dateObj = new Date()

		// Create the comment
		const newComment = await Task.updateOne(
			{ _id: new mongoose.Types.ObjectId(taskId) },
			{
				$currentDate: { lastModified: true },
				$push: { comments: { comment, user: userId, lastModified: dateObj.toISOString() } }
			}
		)

		// let's do aggregates here to get the user's full name
		const task = await Task.aggregate([
			{
				$match: { _id: new mongoose.Types.ObjectId(taskId) }
			},
			{
				$unwind: '$comments'
			},
			{
				// We want to return only the latest comment to the frontend after creation.
				$match: { 'comments.lastModified': { $gte: dateObj.toISOString() } }
			},
			{
				$lookup: {
					from: 'users',
					localField: 'comments.user',
					foreignField: '_id',
					as: 'commentOwner'
				}
			},
			{
				$unwind: '$commentOwner'
			},
			{
				$group: {
					_id: '$_id',
					comments: {
						$push: {
							_id: '$comments._id',
							lastModified: '$comments.lastModified',
							comment: '$comments.comment',
							user: '$commentOwner.firstName', // how to generate the full name
							photo: '$commentOwner.photo'
						}
					}
				}
			}
		])

		console.log('task[0].comments', task[0].comments)
		res.status(200).json(task[0].comments)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export async function getTaskComments(req, res) {
	try {
		const { taskId } = req.params
		const task = await Task.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(taskId)
				}
			},

			{
				$unwind: '$comments'
			},

			{
				$lookup: {
					from: 'users',
					localField: 'comments.user',
					foreignField: '_id',
					as: 'commentOwner'
				}
			},

			{
				$unwind: '$commentOwner'
			},

			{
				$group: {
					_id: '$_id',
					comments: {
						$push: {
							_id: '$comments._id',
							lastModified: '$comments.lastModified',
							comment: '$comments.comment',
							user: '$commentOwner.firstName',
							photo: '$commentOwner.photo'
						}
					}
				}
			}
		])

		// send task data to front-end
		console.log('task[0].comments', task[0].comments)
		res.status(200).json(task[0].comments)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export async function getTaskDetails(req, res) {
	try {
		const { taskId, teamId } = req.params

		const task = await Task.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(taskId),
					team: new mongoose.Types.ObjectId(teamId)
				}
			},
			{
				$lookup: {
					from: 'projects',
					localField: 'project',
					foreignField: '_id',
					as: 'projectDetails'
				}
			},
			{
				$lookup: {
					from: 'teams',
					localField: 'team',
					foreignField: '_id',
					as: 'teamDetails'
				}
			},
			{
				$group: {
					_id: '$_id',
					team: {
						$push: {
							_id: '$teamDetails._id',
							name: '$teamDetails.name'
						}
					},
					project: {
						$push: {
							_id: '$projectDetails._id',
							title: '$projectDetails.title'
						}
					}
				}
			}
		])

		// send task data to front-end
		console.log('task[0]', task)
		res.status(200).json(task)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
