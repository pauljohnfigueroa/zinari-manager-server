import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from './models/User.js'


export const register = async (req, res) => {
    try {
        // get the user information from the form using req.body
        const {
            firstName,
            lastName,
            extName,
            phone,
            email,
            password,
            password2,
            roles,
            departments,
            branches,
            teams,
            projects,
            tasks,
            digitalSignature
        } = req.body

        if (password !== password2) return { "error": "Password must match." }

        // password salt
        const salt = await bcrypt.genSalt(10)
        // password hash
        const passwordHash = await bcrypt.hash(password, salt)

        // new User()
        const newUser = new User({
            firstName,
            lastName,
            extName,
            phone,
            email,
            password: passwordHash,
            roles,
            departments,
            branches,
            teams,
            projects,
            tasks,
            digitalSignature
        })
        // save new user
        const savedUser = await newUser.save()

        // response
        // do not include password to the response
        savedUser.password = undefined
        res.status(201).json(savedUser)

    } catch (error) {

    }
}

export const login = async () => {

}

