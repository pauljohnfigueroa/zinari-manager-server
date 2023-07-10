import express from 'express'
const router = express.Router()

// import controller functions
import {
	createTask,
	getTask,
	getTasks,
	getTeamTasks,
	updateTask,
	deleteTask
} from '../controllers/tasks.js'

import { verifyToken } from '../middleware/auth.js'

/* Read Routes */
router.get('/:id', verifyToken, getTask)
router.post('/', verifyToken, createTask)
router.post('/user', verifyToken, getTasks)
router.get('/:teamId/tasks', verifyToken, getTeamTasks)

/* Update Routes */
router.patch('/:id', verifyToken, updateTask)

/* Delete Routes */
router.delete('/:id', verifyToken, deleteTask)

export default router
