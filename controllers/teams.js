import mongoose from "mongoose";

import Team from "../models/Team.js";
import User from "../models/User.js";

export const createTeam = async (req, res) => {
    try {
        const {
            userId,
            name,
            description,
            leader
        } = req.body

        const user = await User.findById(userId)
        if (!user.extName) user.extName = ''
        const fullName = `${user.firstName} ${user.lastName} ${user.extName}`

        const newTeam = new Team({
            name,
            description,
            leader: fullName.trim()
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
            return res.status(404).json({ error: "No such ID." })
        }

        const team = await Team.findByIdAndUpdate({ _id: id }, { ...req.body })
        if (!team) return res.status(400).json({ error: "No such team." })

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
            return res.status(404).json({ error: "No such ID." })
        }

        const team = await Team.findByIdAndDelete({ _id: id })
        if (!team) return res.status(400).json({ error: "No such team." })

        res.status(200).json(team)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}