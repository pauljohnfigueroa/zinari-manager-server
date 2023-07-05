/* April 7, 2023 */
import mongoose from 'mongoose'
import User from '../models/User.js'
import Team from '../models/Team.js'
import Project from '../models/Project.js'

/* Get a single user from the database using the id parameter. */
export const getUser = async (req, res) => {
	try {
		const { id } = req.params
		const user = await User.findById(id).select({ password: 0 })
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/* Get all users */
export const getUsers = async (req, res) => {
	try {
		const users = await User.find().select({ password: 0 })
		res.status(200).json(users)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/* Update a user */
export const updateUser = async (req, res) => {
	const { id } = req.params
	const {
		firstName,
		lastName,
		extName,
		email,
		phone,
		role,
		photo,
		department,
		branch,
		teams,
		projects,
		tasks,
		digitalSignature,
		createdBy
	} = req.body

	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such Id.' })
		}
		const user = await User.findOneAndUpdate({ _id: id }, { ...req.body })
		user.password = undefined

		if (!user) return res.status(400).json({ error: 'User does not exist.' })
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/* Delete a user or multiple users */
export const deleteUser = async (req, res) => {
	const { id } = req.params

	try {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such Id.' })
		}
		const user = await User.findOneAndDelete({ _id: id })
		if (!user) return res.status(400).json({ error: 'User does not exist.' })

		res.status(200).json(user)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/* Get logged in user's teams */
export const getUserTeams = async (req, res) => {
	try {
		const { userId } = req.body

		const teams = await Team.aggregate([
			{
				$match: { leader: new mongoose.Types.ObjectId(userId) }
			},
			{
				$lookup: {
					from: 'users',
					localField: 'leader',
					foreignField: '_id',
					as: 'teamLeader'
				}
			},
			{
				$lookup: {
					from: 'users',
					localField: 'members',
					foreignField: '_id',
					as: 'teamMembers'
				}
			}
		])

		res.status(200).json(teams)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/* Get logged in user's projects */
export const getUserProjects = async (req, res) => {
	try {
		const { userId } = req.body

		const projects = await Project.aggregate([
			{
				$match: { manager: new mongoose.Types.ObjectId(userId) }
			},
			{
				$lookup: {
					from: 'users',
					localField: 'manager',
					foreignField: '_id',
					as: 'projManager'
				}
			},
			{
				$lookup: {
					from: 'teams',
					localField: 'teams',
					foreignField: '_id',
					as: 'projTeams'
				}
			},
			{
				$project: {
					teams: 0,
					manager: 0
				}
			}
		])

		res.status(200).json(projects)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
