import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title description is mandatory."],
    trim: true
  },
  subject: {
    type: String,
    required: [true, "Subject classification is mandatory."],
    trim: true
  },
  deadline: {
    type: Date,
    required: [true, "A calendar deadline date must be declared."]
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("tasks", taskSchema);