import mongoose from 'mongoose'

import Team from '../models/Team.js'
import { utilGetUserTeam } from '../utils/db.teams.js'

export async function createTeam(req, res) {
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
		const savedTeamId = savedTeam._id

		/* 
		Fetch the last inserted team and make it conform to the format
 		that matches the Team datagrid's shape. 
		*/
		const savedTeamFormatted = await utilGetUserTeam(Team, savedTeamId)

		res.status(201).json(savedTeamFormatted)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export async function getTeam(req, res) {
	try {
		const { id } = req.params
		const team = await Team.findById(id)
		res.status(200).json(team)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/* Get teams */
export async function getTeams(req, res) {
	try {
		const teams = await Team.find()
		res.status(200).json(teams)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/* Get team members */
export async function getTeamMembers(req, res) {
	try {
		const { id } = req.params
		const memberNames = await Team.aggregate([
			{
				$match: { _id: new mongoose.Types.ObjectId(id) }
			},
			{
				$unwind: '$members'
			},
			{
				$lookup: {
					from: 'users',
					localField: 'members',
					foreignField: '_id',
					as: 'membersNames'
				}
			},
			{
				$unwind: '$membersNames'
			},
			{
				$group: {
					_id: '$_id',
					members: {
						$push: {
							firstName: '$membersNames.firstName',
							lastName: '$membersNames.lastName',
							extName: '$membersNames.extName'
						}
					}
				}
			}
		])

		console.log('memberNames', memberNames[0])
		res.status(200).json(memberNames[0])
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

/* Update Team */
export async function updateTeam(req, res) {
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

		/* Repeated code, do something. */
		/* 
		Fetch the last updated team and make it conform to the format
 		that matches the Team datagrid's shape. 
		*/
		const updatedTeamFormatted = await utilGetUserTeam(Team, id)

		res.status(200).json(updatedTeamFormatted)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export async function deleteTeam(req, res) {
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
