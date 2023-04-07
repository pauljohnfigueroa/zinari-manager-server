import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    owner: String,
    title: {
        type: String,
        required: true,
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
    dueDate: Date
}, {
    timestamps: true
})

const Task = mongoose.model('Task', TaskSchema)
export default Task