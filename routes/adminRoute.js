const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const Transaction = require("../models/Transactions");
const Group = require("../models/Group");

// Endpoint to get admin statistics
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalIndividualTransactions = await Transaction.countDocuments();
    const totalGroupTransactions = await Group.countDocuments();

    const userTransactions = await User.aggregate([
      {
        $lookup: {
          from: "transactions",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$userId", { $toObjectId: "$userid" }],
                },
              },
            },
          ],
          as: "individualTransactions",
        },
      },
      {
        $lookup: {
          from: "groups",
          localField: "_id",
          foreignField: "userId",
          as: "groupTransactions",
        },
      },
      {
        $project: {
          name: 1,
          individualTransactionsCount: { $size: "$individualTransactions" },
          groupTransactionsCount: { $size: "$groupTransactions" },
        },
      },
    ]);

    res.status(200).json({
      totalUsers,
      totalIndividualTransactions,
      totalGroupTransactions,
      userTransactions: userTransactions.map((user) => ({
        name: user.name,
        individualTransactions: user.individualTransactionsCount,
        groupTransactions: user.groupTransactionsCount,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
});

module.exports = router;
