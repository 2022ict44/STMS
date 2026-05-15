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

