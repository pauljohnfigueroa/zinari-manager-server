import mongoose from 'mongoose'

import Project from '../models/Project.js'
// import User from '../models/User.js'

export const createProject = async (req, res) => {
	try {
		const { manager, title, description, dueDate, teams } = req.body
		// extract the team _id's
		const teamIds = teams.map(item => item.split('|')[0])

		const newProject = new Project({
			title,
			description,
			teams: teamIds,
			manager,
			dueDate
		})

		const savedProject = await newProject.save()

		/* return the aggregated new project  */
		const project = await Project.aggregate([
			{
				$match: { _id: new mongoose.Types.ObjectId(savedProject._id) }
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
		res.status(201).json(project)
	} catch (error) {
		res.status(500).json({ error: error.mesages })
	}
}

export const getProject = async (req, res) => {
	const { id } = req.params
	try {
		const project = await Project.findById(id)
		res.status(200).json(project)
	} catch (error) {
		res.status(500).json({ error: error.mesages })
	}
}

export const getProjects = async (req, res) => {
	try {
		const projects = await Project.find()
		res.status(200).json(projects)
	} catch (error) {
		res.status(500).json({ error: error.mesages })
	}
}

export const updateProject = async (req, res) => {
	const { id } = req.params

	try {
		// check if _id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such ID.' })
		}

		const project = await Project.findByIdAndUpdate({ _id: id }, { ...req.body })
		if (!project) return res.status(400).json({ error: 'No such project.' })

		res.status(200).json(project)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const deleteProject = async (req, res) => {
	const { id } = req.params

	try {
		// check if _id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such ID.' })
		}

		const project = await Project.findByIdAndDelete({ _id: id })
		if (!project) return res.status(400).json({ error: 'No such project.' })

		res.status(200).json(project)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
