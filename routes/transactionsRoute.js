
const dayjs = require('dayjs');
const express=require('express');
const router=express.Router();
const Transaction=require('../models/Transactions')
router.post("/add-transaction", async function(req, res) {
    try {
        const newtransaction = new Transaction(req.body);
        await newtransaction.save();
        res.send('Transaction added successfully');
    } catch (error) {
            res.status(500).send({ message: error.message });
        }
        
    });
    router.post("/edit-transaction", async function(req, res) {
        try {
            await Transaction.findOneAndUpdate({_id: req.body.transactionId},req.body.payload)
            res.send('Transaction updated successfully');
        } catch (error) {
                res.status(500).send({ message: error.message });
            }
            
        });
        router.post("/delete-transaction", async function(req, res) {
            try {
                await Transaction.findOneAndDelete({_id: req.body.transactionId})
                res.send('Transaction updated successfully');
            } catch (error) {
                    res.status(500).send({ message: error.message });
                }
                
            });
    
        router.post("/get-all-transactions", async (req, res) => {
            const { frequency, selectedRange, userid, type } = req.body;
            try {
                let query = { userid: userid };
        
                if (frequency !== "custom" && frequency !== "all") {
                    query.date = {
                        $gt: dayjs().subtract(Number(frequency), "days").toDate()
                    };
                } else if (frequency === "custom") {
                    query.date = {
                        $gte: new Date(selectedRange[0]),
                        $lte: new Date(selectedRange[1])
                    };
                }
                // For 'all', we don't add any date filter
        
                if (type !== 'all') {
                    query.type = type;
                }
        
                console.log("Query being executed:", query);
                const transactions = await Transaction.find(query);
                console.log(transactions);
                res.send(transactions);
            } catch (error) {
                console.error("Failed to retrieve transactions:", error);
                res.status(500).json({ message: error.message });
            }
        });
    
module.exports=router;
