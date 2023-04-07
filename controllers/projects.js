import Project from '../models/Project.js'
import User from '../models/User.js'

export const createProject = async (req, res) => {
    try {
        const {
            userId,
            title,
            description
        } = req.body

        const user = await User.findById(userId)
        if (!user.extName) user.extName = ''
        const fullName = `${user.firstName} ${user.lastName} ${user.extName}`

        const newProject = new Project({
            title,
            description,
            manager: fullName.trim()
        })
        const savedProject = await newProject.save()

        res.status(201).json(savedProject)

    } catch (error) {
        res.status(500).json({ error: error.mesages })
    }
}

export const getProject = async (req, res) => {
    try {
        const { id } = req.params
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