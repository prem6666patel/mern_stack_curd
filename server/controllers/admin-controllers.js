const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");

// Get all users (excluding passwords)
const getAllUser = async (req, res, next) => {
  try {
    const userData = await User.find({}, { password: 0 });

    console.log("userData:", userData);

    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }

    res.status(200).json({ userData });
  } catch (error) {
    console.error("Error in getAllUser:", error.message);
    next(error);
  }
};

// Get all contact submissions
const getAllContacts = async (req, res, next) => {
  try {
    const contactsData = await Contact.find();

    console.log("contacts data:", contactsData);

    if (!contactsData || contactsData.length === 0) {
      return res.status(404).json({ message: "No contact data found!" });
    }

    res.status(200).json({ contactsData });
  } catch (error) {
    console.error("Error in getAllContacts:", error.message);
    next(error);
  }
};

// Delete user by ID
const deleteUserbyId = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteUserbyId:", error);
    next(error);
  }
};

// get user by id

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await User.findOne({ _id: id });

    return res.status(200).json(result);
  } catch (error) {
    console.log("error in getuserbyid  : ", error);
  }
};

// get service by id

const getServiceById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Service.findOne({ _id: id });

    return res.status(200).json(result);
  } catch (error) {
    console.log("error in get service by id : ", error);
  }
};

// update user by id

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;

    console.log("update user by id : ", updateUserById);

    const result = await User.updateOne({ _id: id }, { $set: updateUserData });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      result, // optional: return the update info
    });
  } catch (error) {
    console.error("Error in update user by id:", error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

// delete services by id

const deleteServiceById = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Service.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "service not found!" });
    }

    res.status(200).json({ message: "service deleted successfully!" });
  } catch (error) {
    console.error("Error to delete service ", error);
    return res.status(500).json({ error: "Failed to delete user" });
  }
};

// update service by id

const updateServiceById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateServiceData = req.body;

    const result = await Service.updateOne(
      { _id: id },
      { $set: updateServiceData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "service updated successfully",
      result,
    });
  } catch (error) {
    console.error("Error in update service by id:", error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

// add service

const addService = async (req, res) => {
  try {
    const { service, description, price, provider } = req.body;

    if (!service || !description || !price || !provider) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newService = await Service.create({
      service,
      description,
      price,
      provider,
    });

    res
      .status(201)
      .json({ message: "Service added successfully", service: newService });
  } catch (error) {
    console.error("Error adding service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUser,
  getAllContacts,
  deleteUserbyId,
  getUserById,
  updateUserById,
  deleteServiceById,
  getServiceById,
  updateServiceById,
  addService,
};
