import Task from "../model/taskModel.js";

// CREATE: Add a new student task or assignment
export const create = async (req, res) => {
  try {
    const { title, subject } = req.body;
    
    // Check if task duplicate exists
    const taskExist = await Task.findOne({ title, subject });
    if (taskExist) {
      return res.status(400).json({ message: "This assignment task has already been tracked." });
    }

    const taskData = new Task(req.body);
    const savedTask = await taskData.save();
    return res.status(201).json(savedTask);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

// READ: Fetch all available tasks from the database
export const fetch = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks or deadlines found." });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};