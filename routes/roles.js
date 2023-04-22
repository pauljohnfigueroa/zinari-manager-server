import express from 'express'
const router = express.Router()

// import controller functions
import { createRole, getRole, getRoles, updateRole, deleteRole } from '../controllers/roles.js'

import { verifyToken } from '../middleware/auth.js'

/* Read Routes */
router.get('/:id', verifyToken, getRole)
router.post('/', verifyToken, createRole)
router.get('/', verifyToken, getRoles)

/* Update Routes */
router.patch('/:id', verifyToken, updateRole)

/* Delete Routes */
router.delete('/:id', verifyToken, deleteRole)

export default router
