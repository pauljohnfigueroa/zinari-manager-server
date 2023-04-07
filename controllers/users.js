import User from '../models/User.js'

/* 
    April 7, 2023
    Get a single user from the database using the id parameter.
*/
export const getUser = async (req, res) => {
    try {
        // get the user's id from the parameters
        const { id } = req.params
        // use the id to find the user and exclude the password 
        const user = await User.findById(id).select({ password: 0 })
        // to exclude the password, you can also do it this way.
        // user.password = undefined

        // send user data to front-end
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getUsers = async (req, res) => {
    try {
        // use the id to find the user and exclude the password 
        const users = await User.find().select({ password: 0 })
        // send user data to front-end
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}