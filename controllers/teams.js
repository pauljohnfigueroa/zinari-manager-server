import mongoose from 'mongoose'

import Team from '../models/Team.js'
// import User from '../models/User.js'

export const createTeam = async (req, res) => {
	try {
		const { leader, name, description, members } = req.body
		// get the _id of each member
		const memberIds = members.map(item => item.split('|')[0])

		const newTeam = new Team({
			name,
			description,
			leader,
			members: memberIds
		})
		const savedTeam = await newTeam.save()

		res.status(201).json(savedTeam)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const getTeam = async (req, res) => {
	try {
		const { id } = req.params
		const team = await Team.findById(id)
		res.status(200).json(team)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const getTeams = async (req, res) => {
	try {
		const teams = await Team.find()
		res.status(200).json(teams)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const updateTeam = async (req, res) => {
	const { id } = req.params

	try {
		// check if _id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such ID.' })
		}

		const { teamMembers } = req.body
		const teamMemberIds = teamMembers.map(member => member.split('|')[0])

		const team = await Team.findByIdAndUpdate({ _id: id }, { ...req.body, members: teamMemberIds })
		if (!team) return res.status(400).json({ error: 'No such team.' })

		res.status(200).json(team)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const deleteTeam = async (req, res) => {
	const { id } = req.params

	try {
		// check if _id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such ID.' })
		}

		const team = await Team.findByIdAndDelete({ _id: id })
		if (!team) return res.status(400).json({ error: 'No such team.' })

		res.status(200).json(team)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
