import mongoose from 'mongoose'

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 50
    },
    description: {
      type: String,
      max: 200
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    leader: mongoose.Schema.Types.ObjectId
  },
  {
    timestamps: true
  }
)
const Team = mongoose.model('Team', TeamSchema)
export default Team
