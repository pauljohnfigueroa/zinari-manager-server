import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    owner: String,
    title: {
        type: String,
        max: 100
    },
    description: {
        type: String,
        max: 200
    },
    comments: Array,
    status: String,
    priority: String,
    category: String,
    dueDate: String
}, {
    timestamps: true
})

const Task = mongoose.model('Task', TaskSchema)
export default Task