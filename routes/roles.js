import express from 'express'
const router = express.Router()

// import controller functions
import { createRole, getRole, getRoles, updateRole, deleteRole } from '../controllers/roles.js'

import { verifyToken } from '../middleware/auth.js'

/* Read Routes */
router.get('/:name', verifyToken, getRole)
router.get('/', verifyToken, getRoles)

/* Create Routes */
router.post('/', verifyToken, createRole)

/* Update Routes */
router.patch('/:id', verifyToken, updateRole)

/* Delete Routes */
router.delete('/:id', verifyToken, deleteRole)

export default router
