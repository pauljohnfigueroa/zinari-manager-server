import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema(
  {
    createdBy: String,
    name: {
      type: String,
      required: true,
      max: 100
    },
    description: {
      type: String,
      max: 200
    },
    permissions: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Role = mongoose.model('Role', RoleSchema)
export default Role
