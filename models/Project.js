import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50
    },
    description: {
        type: String,
        max: 200
    },
    teams: Array,
    manager: String,
    tasks: Array
})
const Project = mongoose.model('Project', ProjectSchema)
export default Project