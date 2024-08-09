const express = require("express");
const router = express.Router();
const Group = require("../models/Group");

// Create a new group
router.post("/create-group", async (req, res) => {
  const { userId, groupName, description, members } = req.body;
  try {
    const newGroup = new Group({
      userId,
      groupName,
      description,
      members,
    });
    await newGroup.save();
    res
      .status(200)
      .json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ message: "Error creating group", error });
  }
});

// Get all groups for a user
router.get("/get-groups/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const groups = await Group.find({ userId });
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Error fetching groups", error });
  }
});

// Update a group
router.put("/update-group/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const { groupName, description, members } = req.body;

  console.log("Received PUT request for group:", groupId);
  console.log("Update data:", { groupName, description, members });

  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { groupName, description, members },
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res
      .status(200)
      .json({ message: "Group updated successfully", group: updatedGroup });
  } catch (error) {
    console.error("Error updating group", error);
    res.status(500).json({ message: "Error updating group", error });
  }
});

// Delete a group
router.delete("/delete-group/:groupId", async (req, res) => {
  const { groupId } = req.params;

  try {
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group", error);
    res.status(500).json({ message: "Error deleting group", error });
  }
});

module.exports = router;
