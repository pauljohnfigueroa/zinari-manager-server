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
            userId,
            title,
            description,
            comments,
            status,
            priority,
            category,
            dueDate
        } = req.body

        const user = await User.findById(userId)
        if (!user.extName) user.extName = ''
        const fullName = `${user.firstName} ${user.lastName} ${user.extName}`

        // new Task()
        const newTask = new Task({
            owner: fullName.trim(),
            title,
            description,
            comments,
            status,
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