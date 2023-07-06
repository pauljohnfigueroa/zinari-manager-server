import mongoose from 'mongoose'

import Project from '../models/Project.js'
import { utilGetUserProject } from '../utils/db.projects.js'

export const createProject = async (req, res) => {
	try {
		const { manager, title, description, dueDate, teams } = req.body
		// extract the project _id's
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
		const project = await utilGetUserProject(Project, savedProject._id)

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

		const { projTeams } = req.body
		const projTeamIds = projTeams.map(team => team.split('|')[0])

		const updatedProject = await Project.findByIdAndUpdate(
			{ _id: id },
			{ ...req.body, teams: projTeamIds }
		)
		if (!updatedProject) return res.status(400).json({ error: 'No such project.' })

		/* return the aggregated new project  */
		const project = await utilGetUserProject(Project, updatedProject._id)

		console.log('project', project)
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
