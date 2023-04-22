import mongoose from 'mongoose'

import Task from '../models/Task.js'
import User from '../models/User.js'

/* 
    April 7, 2023
    Create a task.
*/
export const createTask = async (req, res) => {
    try {
        // coming from the add task user form in the front end
        const {
            email,
            title,
            description,
            priority,
            category,
            dueDate
        } = req.body

        const newTask = new Task({
            owner: email,
            title,
            description,
            priority,
            category,
            dueDate
        })

        // save new task
        const savedTask = await newTask.save()

        // response
        res.status(201).json(savedTask)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

/* 
    April 7, 2023
    Get a single task from the database using the id parameter.
*/
export const getTask = async (req, res) => {
    try {
        // get the task's id from the parameters
        const { id } = req.params
        // use the id to find the user and exclude the password 
        const task = await Task.findById(id)
        // to exclude the password, you can also do it this way.
        // task.password = undefined

        // send task data to front-end
        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getTasks = async (req, res) => {
    try {
        // use the id to find the task and exclude the password 
        const task = await Task.find()
        // send task data to front-end
        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateTask = async (req, res) => {

    const { id } = req.params

    try {
        // check if _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such ID." })
        }

        const task = await Task.findByIdAndUpdate({ _id: id }, { ...req.body })
        if (!task) return res.status(400).json({ error: "No such task." })

        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteTask = async (req, res) => {

    const { id } = req.params

    try {
        // check if _id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such ID." })
        }

        const task = await Task.findByIdAndDelete({ _id: id })
        if (!task) return res.status(400).json({ error: "No such task." })

        res.status(200).json(task)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}