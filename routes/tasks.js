import express from 'express'
const router = express.Router()

// import controller functions
import {
    createTask,
    getTask,
    getTasks
} from '../controllers/tasks.js'

import { verifyToken } from '../middleware/auth.js'

/* Read Routes */

router.get('/:id', verifyToken, getTask)
router.post('/', verifyToken, createTask)
router.get('/', verifyToken, getTasks)

export default router