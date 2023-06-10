import mongoose from 'mongoose'

import Project from '../models/Project.js'
import User from '../models/User.js'

export const createProject = async (req, res) => {
	try {
		const { email, name, description, dueDate, teams, tasks } = req.body
		// extract the _id
		const teamIds = teams.map(item => item[0])

		const newProject = new Project({
			name,
			description,
			manager: email,
			dueDate,
			teams: teamIds,
			tasks
		})
		const savedProject = await newProject.save()

		res.status(201).json(savedProject)
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
