import express from 'express'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

import {
	getProject,
	createProject,
	getProjects,
	getProjectTeams,
	getProjectTeamMembers,
	updateProject,
	deleteProject
} from '../controllers/projects.js'

/* Create Routes */
router.post('/', verifyToken, createProject)

/* Read Routes */
router.get('/:id', verifyToken, getProject)
router.get('/', verifyToken, getProjects)
router.get('/:projId/teams', verifyToken, getProjectTeams)

/* Create Routes */
router.post('/teams/members', verifyToken, getProjectTeamMembers)

/* Update Routes */
router.patch('/:id', verifyToken, updateProject)

/* Delete Routes */
router.delete('/:id', verifyToken, deleteProject)

export default router
