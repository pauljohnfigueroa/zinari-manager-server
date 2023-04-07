import express from 'express'

import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

import { getProject, createProject, getProjects } from '../controllers/projects.js'

router.get('/:id', verifyToken, getProject)
router.post('/', verifyToken, createProject)
router.get('/', verifyToken, getProjects)

export default router