import express from 'express'
const router = express.Router()

import { verifyToken } from '../middleware/auth.js'

import {
    createTeam,
    deleteTeam,
    getTeam,
    getTeams,
    updateTeam
} from '../controllers/teams.js'

/* Create Routes */
router.post('/', verifyToken, createTeam)

/* Read Routes */
router.get('/:id', verifyToken, getTeam)
router.get('/', verifyToken, getTeams)

/* Update Routes */
router.patch('/:id', verifyToken, updateTeam)

/* Delete Routes */
router.delete('/:id', verifyToken, deleteTeam)
export default router