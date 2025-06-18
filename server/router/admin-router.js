const express = require("express");
const router = express.Router();
const admin = require("../controllers/admin-controllers");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Get all users
router.route("/users").get(authMiddleware, adminMiddleware, admin.getAllUser);

// get user by ID

router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, admin.getUserById);

// get service by id

router
  .route("/service/:id")
  .get(authMiddleware, adminMiddleware, admin.getServiceById);

// update user by ID

router
  .route("/users/update/:id")
  .put(authMiddleware, adminMiddleware, admin.updateUserById);

// Delete user by ID
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, admin.deleteUserbyId);

// Get all contact form submissions
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, admin.getAllContacts);

// Delete service using id

router
  .route("/services/delete/:id")
  .delete(authMiddleware, adminMiddleware, admin.deleteServiceById);

// update service using id service/update/${id}

router
  .route("/service/update/:id")
  .put(authMiddleware, adminMiddleware, admin.updateServiceById);


router.route("/Addservice").post(authMiddleware,adminMiddleware,admin.addService)

module.exports = router;
