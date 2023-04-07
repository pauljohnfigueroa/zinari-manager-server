import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    extName: {
        type: String,
        min: 1,
        max: 15
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    departments: {
        type: Array,
        required: true
    },
    branches: {
        type: Array,
        required: true
    },
    teams: {
        type: Array,
        required: true
    },
    projects: {
        type: Array,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    },
    digitalSignature: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const User = mongoose.model('User', UserSchema)

export default User