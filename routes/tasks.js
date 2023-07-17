import express from 'express'
const router = express.Router()

// import controller functions
import {
	createTask,
	getTask,
	getUserTasks,
	getTeamTasks,
	updateTask,
	deleteTask,
	createComment,
	getTaskComments
} from '../controllers/tasks.js'

import { verifyToken } from '../middleware/auth.js'

/* Read Routes */
router.get('/:id', verifyToken, getTask)
router.post('/', verifyToken, createTask)
router.post('/user', verifyToken, getUserTasks)
router.get('/:projectId/:teamId/tasks', verifyToken, getTeamTasks)
router.post('/comment', verifyToken, createComment)
router.get('/:taskId/comments', verifyToken, getTaskComments)

/* Update Routes */
router.patch('/:id', verifyToken, updateTask)

/* Delete Routes */
router.delete('/:id', verifyToken, deleteTask)

export default router
