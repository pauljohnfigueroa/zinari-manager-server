import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema(
  {
    createdBy: String,
    name: {
      type: String,
      max: 100
    },
    description: {
      type: String,
      max: 200
    },
    permissions: Array
  },
  {
    timestamps: true
  }
)

const Role = mongoose.model('Role', RoleSchema)
export default Role
