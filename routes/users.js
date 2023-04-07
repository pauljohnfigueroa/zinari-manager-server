import express from 'express'

const router = express.Router()

// import controller functions
import {
    getUser,
    getUsers,
    // getUserProjects,
    // getUserTeams,
    // getUserTasks
} from '../controllers/users.js'

import { verifyToken } from '../middleware/auth.js'

/* Read Routes */
router.get('/:id', verifyToken, getUser)
router.get('/', verifyToken, getUsers)
// router.get('/:id/tasks', verifyToken, getTasks)
// router.get('/:id/projects', verifyToken, getProjects)
// router.get('/:id/teams', verifyToken, getTeams)

/* Update Routes */
// router.patch('/:userId/tasks/:taskId', verifyToken, updateUserTask)
// router.patch('/:userId/teams/:teamsId', verifyToken, joinLeaveTeam)

/* Delete Routes */
// router.delete('/:userId/tasks/:taskId', verifyToken, deleteUserTask)

export default router