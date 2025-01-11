const express = require("express");
const { createUser, getUsers, updateUser, deleteUser } = require("../controllers/users.controllers");
const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.put("/:email", updateUser);
router.delete("/:email", deleteUser);

module.exports = router;
