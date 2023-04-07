import express from 'express'
const router = express.Router()

// import controller functions
import {
    createTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask
} from '../controllers/tasks.js'

import { verifyToken } from '../middleware/auth.js'

/* Read Routes */
router.get('/:id', verifyToken, getTask)
router.post('/', verifyToken, createTask)
router.get('/', verifyToken, getTasks)

/* Update Routes */
router.patch('/:id', verifyToken, updateTask)

/* Delete Routes */
router.delete('/:id', verifyToken, deleteTask)


export default router