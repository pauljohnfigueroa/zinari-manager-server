import mongoose from 'mongoose'
import Role from '../models/Role.js'

/* 
    April 22, 2023
    Create a role.
*/
export async function createRole(req, res) {
	try {
		// coming from the add role user form in the front end
		const { createdBy, name, description, permissions } = req.body

		const newRole = new Role({
			createdBy,
			name,
			description,
			permissions
		})

		// save new role
		const savedRole = await newRole.save()

		// response
		res.status(201).json(savedRole)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export async function getRole(req, res) {
	try {
		// get the role's id from the parameters
		const { name } = req.params
		// use the id to find the user and exclude the password
		const role = await Role.find({ name })
		// to exclude the password, you can also do it this way.
		// role.password = undefined

		// send role data to front-end
		res.status(200).json(role)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export async function getRoles(req, res) {
	try {
		// use the id to find the role and exclude the password
		const role = await Role.find()
		// send role data to front-end
		res.status(200).json(role)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export async function updateRole(req, res) {
	const { id } = req.params

	try {
		// check if _id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such ID.' })
		}

		const role = await Role.findByIdAndUpdate({ _id: id }, { ...req.body })
		if (!role) return res.status(400).json({ error: 'No such role.' })

		res.status(200).json(role)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export async function deleteRole(req, res) {
	const { id } = req.params

	try {
		// check if _id is valid
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).json({ error: 'No such ID.' })
		}

		const role = await Role.findByIdAndDelete({ _id: id })
		if (!role) return res.status(400).json({ error: 'No such role.' })

		res.status(200).json(role)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
