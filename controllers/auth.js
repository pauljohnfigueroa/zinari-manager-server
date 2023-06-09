import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

export const register = async (req, res) => {
	try {
		// get the user information from the form using req.body
		const {
			firstName,
			lastName,
			extName,
			email,
			phone,
			password,
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

		//if (password !== password2) return { error: 'Password must match.' }

		// password salt
		const salt = await bcrypt.genSalt()
		// password hash
		const passwordHash = await bcrypt.hash(password, salt)

		// new User()
		const newUser = new User({
			firstName,
			lastName,
			extName,
			email,
			phone,
			password: passwordHash,
			role,
			photo,
			department,
			branch,
			teams,
			projects,
			tasks,
			digitalSignature,
			createdBy
		})
		// save new user
		const savedUser = await newUser.save()

		// response
		// do not include password to the response
		savedUser.password = undefined
		res.status(201).json(savedUser)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

export const login = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) return res.status(400).json({ error: 'Email does not exists.' })

		const isPwdMatch = await bcrypt.compare(password, user.password)
		if (!isPwdMatch) return res.status(400).json({ error: 'Invalid credentials.' })
		// do not send the password to the front end
		user.password = undefined
		// generate token
		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
		// send credentials to the front end
		res.status(200).json({ user, token })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
