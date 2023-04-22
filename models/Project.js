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
    tasks: Array,
    manager: String,
    dueDate: String
}, {
    timestamps: true
})

const Project = mongoose.model('Project', ProjectSchema)
export default Project