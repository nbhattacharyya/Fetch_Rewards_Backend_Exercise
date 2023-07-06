
const helperFunctions = require('../utils/helper.js');

const express = require('express');
const router = express.Router();

let receiptsPointsMap = {};

router.post('/', (req, res) => {
    let totalPoints = 0;
    totalPoints += (helperFunctions.namePoints(req.body.retailer)
        + helperFunctions.totalAmountPoints(req.body.total)
        + helperFunctions.dayPurchasePoints(req.body.purchaseDate)
        + helperFunctions.purchaseTimePoints(req.body.purchaseTime)
        + helperFunctions.itemDescriptions(req.body.items)
        + helperFunctions.itemsLengthPoints(req.body.items));
    let id = helperFunctions.generateId();
    while (id in receiptsPointsMap) {
        id = helperFunctions.generateId();
    }
    receiptsPointsMap[id] = totalPoints;
    res.status(200).json({ success: "receipt processed", id: id });
});

router.get('/', (req, res) => {
    let id = req.baseUrl.split('/')[2];
    let points = receiptsPointsMap[id];
    res.send({points: points});
});

module.exports = router;