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

// UPDATE: Modify properties of a task via ID parameters
export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const taskExist = await Task.findOne({ _id: id });
    if (!taskExist) {
      return res.status(404).json({ message: "Target task not found." });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    return res.status(201).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};

// DELETE: Purge a task record entry completely from storage
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const taskExist = await Task.findOne({ _id: id });
    if (!taskExist) {
      return res.status(404).json({ message: "Target task record not found." });
    }

    await Task.findByIdAndDelete(id);
    return res.status(201).json({ message: "Task deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error." });
  }
};