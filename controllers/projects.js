import mongoose from 'mongoose'

import Project from '../models/Project.js'
import Team from '../models/Team.js'

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

export const getProjectTeams = async (req, res) => {
	const { projId } = req.params
	try {
		const projTeams = await Project.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(projId) } },
			{
				$lookup: {
					from: 'teams',
					localField: 'teams',
					foreignField: '_id',
					as: 'projTeams'
				}
			}
		])
		//console.log(projTeams)
		res.status(200).json(projTeams)
	} catch (error) {
		res.status(500).json({ error: error.mesages })
	}
}

export const getProjectTeamMembers = async (req, res) => {
	const { teams } = req.body
	const teamIds = teams.map(team => new mongoose.Types.ObjectId(team._id))
	// console.log('teamIds', teamIds)

	try {
		const teamMembers = await Team.aggregate([
			{
				$match: {
					_id: {
						$in: teamIds
					}
				}
			},
			{
				$lookup: {
					from: 'users',
					localField: 'members',
					foreignField: '_id',
					as: 'teamMembers'
				}
			},
			{
				$lookup: {
					from: 'users',
					localField: 'leader',
					foreignField: '_id',
					as: 'teamLeader'
				}
			}
		])

		// console.log('teamMembers', teamMembers)

		res.status(200).json(teamMembers)
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
