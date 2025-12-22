import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Task from "../models/Task.js";

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");

    // Promise.all use korar somoy bracket thik moto dite hobe
    const usersWithTaskCount = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user._id,
          status: "Completed",
        });

        return {
          ...user._doc,
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      }),
    );

    res.json(usersWithTaskCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUsers, getUserById, deleteUser };
