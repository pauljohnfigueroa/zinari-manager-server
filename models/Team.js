import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50
    },
    description: {
        type: String,
        max: 200
    },
    projects: Array,
    members: Array,
    leader: String
})
const Team = mongoose.model('Team', TeamSchema)
export default Team