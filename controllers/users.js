/* April 7, 2023 */

import mongoose from 'mongoose'
import User from '../models/User.js'
import Team from '../models/Team.js'

/* 
    Get a single user from the database using the id parameter.
*/
export const getUser = async (req, res) => {
    try {
        // get the user's id from the parameters
        const { id } = req.params
        // use the id to find the user and exclude the password 
        const user = await User.findById(id).select({ password: 0 })
        // to exclude the password, you can also do it this way.
        // user.password = undefined

        // send user data to front-end
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/* 
    Get all users
*/
export const getUsers = async (req, res) => {
    try {
        // use the id to find the user and exclude the password 
        const users = await User.find().select({ password: 0 })
        // send user data to front-end
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/* 
    Get user's teams based on email.
*/
export const getUserTeams = async (req, res) => {
    try {
        const { email } = req.body
        // use the user's email to find the teams
        const teams = await Team.find({ leader: email })

        // send team data to the front-end
        res.status(200).json(teams)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/* 
    Update a user
*/
export const updateUser = async (req, res) => {

    const { id } = req.params

    try {
        // check if _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such ID." })
        }

        const user = await User.findOneAndUpdate({ _id: id }, { ...req.body })
        if (!user) return res.status(400).json({ error: 'User does not exist.' })

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/* 
    Update a user or multiple users
*/
export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        // check if _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such ID." })
        }

        const user = await User.findOneAndDelete({ _id: id })
        if (!user) return res.status(400).json({ error: 'User does not exist.' })

        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

