const { mongoose } = require('../config/db')

const allowedStatuses = ['pending', 'in-progress', 'complete']

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: allowedStatuses,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
)

projectSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    return returnedObject
  },
})

module.exports = mongoose.model('Project', projectSchema)

