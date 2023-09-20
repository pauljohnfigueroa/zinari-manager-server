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
	getTaskComments,
	getTaskDetails
} from '../controllers/tasks.js'

import { verifyToken } from '../middleware/auth.js'

/* Read Routes */
router.get('/:id', verifyToken, getTask)
router.get('/:projectId/:teamId/tasks', verifyToken, getTeamTasks) // change path to /:projectId/:teamId
router.get('/:taskId/comments', verifyToken, getTaskComments)
router.get('/:taskId/:teamId/details', verifyToken, getTaskDetails)
router.post('/user', verifyToken, getUserTasks)

/* Create Routes */
router.post('/', verifyToken, createTask)
router.post('/comment', verifyToken, createComment)

/* Update Routes */
router.patch('/:id', verifyToken, updateTask)

/* Delete Routes */
router.delete('/:id', verifyToken, deleteTask)

export default router
