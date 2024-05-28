const User = require("../books-api-mvc-db/models/user"); // Import the User class


async function getUsersWithBooks(req, res) {
    try {
      const users = await User.getUsersWithBooks();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching users with books" });
    }
  }
  
// Create a new user
async function createUser(req, res) {
  try {
    const { username, email } = req.body; // Extract user data from request body
    const user = await User.createUser({ username, email }); // Call User.createUser method
    res.status(201).json(user); // Return created user data
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
}

// Retrieve all users
async function getAllUsers(req, res) {
  try {
    const users = await User.getAllUsers(); // Call User.getAllUsers method
    res.json(users); // Return list of user objects
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users" });
  }
}

// Retrieve a user by ID
async function getUserById(req, res) {
  try {
    const id = req.params.id; // Extract user ID from request parameter
    const user = await User.getUserById(id); // Call User.getUserById method
    if (user) {
      res.json(user); // Return user object
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user" });
  }
}

// Update a user
async function updateUser(req, res) {
  try {
    const id = req.params.id; // Extract user ID from request parameter
    const updatedUser = req.body; // Extract updated user data from request body
    const user = await User.updateUser(id, updatedUser); // Call User.updateUser method
    res.json(user); // Return updated user data
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
}

// Delete a user
async function deleteUser(req, res) {
  try {
    const id = req.params.id; // Extract user ID from request parameter
    const result = await User.deleteUser(id); // Call User.deleteUser method
    if (result) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
}

function searchUsers(req, res) {
    // ...
    return (err, users) => {
      if (err) {
        res.status(500).json({ message: "Error searching users" });
      } else {
        res.json(users);
      }
    };
  }

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUsersWithBooks,
};