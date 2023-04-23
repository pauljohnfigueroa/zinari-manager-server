import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
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
      required: false
    },
    photo: {
      type: String,
      required: false
    },
    departments: {
      type: Array,
      required: false
    },
    branches: {
      type: Array,
      required: false
    },
    teams: Array,
    projects: Array,
    tasks: Array,
    digitalSignature: String,
    createdBy: String
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', UserSchema)

export default User
