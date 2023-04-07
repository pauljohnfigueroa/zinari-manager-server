import express from 'express'
const router = express.Router()

import { verifyToken } from '../middleware/auth.js'

import {
    createTeam,
    getTeam,
    getTeams
} from '../controllers/teams.js'

router.get('/:id', verifyToken, getTeam)
router.post('/', verifyToken, createTeam)
router.get('/', verifyToken, getTeams)

export default router