import { Schema, model } from 'mongoose'

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    user: {
      type: Array,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
)

export const Comment = model('Comment', commentSchema)
