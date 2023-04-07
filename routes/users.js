import express from 'express'

const router = express.Router()

// import controller functions
import {
    getUser,
    getUsers,
    updateUser,
    deleteUser
} from '../controllers/users.js'

import { verifyToken } from '../middleware/auth.js'

/* Read Routes */
router.get('/:id', verifyToken, getUser)
router.get('/', verifyToken, getUsers)

/* Update Routes */
router.patch('/:id', verifyToken, updateUser)

/* Delete Routes */
router.delete('/:id', verifyToken, deleteUser)

export default router