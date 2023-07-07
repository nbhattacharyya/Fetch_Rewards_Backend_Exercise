const { body, validationResult } = require('express-validator'); 
const helperFunctions = require('../utils/helper.js');

const express = require('express');
const router = express.Router();

let receiptsPointsMap = {};

router.post('/', [
    body('retailer', 'Invalid retailer').isString().notEmpty().matches("^\\S+$"),
    body('purchaseDate', 'Invalid purchase date').isISO8601(),
    body('purchaseTime', 'Invalid purchase time').isTime(),
    body('items', 'No items in receipt').notEmpty(),
    body('total', 'Invalid total amount').isString().notEmpty().matches("^\\d+\\.\\d{2}$"),
    body().custom(body => {
        const validKeys = ['retailer', 'purchaseDate', 'purchaseTime', 'items', 'total'];
        return Object.keys(body).every(key => validKeys.includes(key))
    }).withMessage('Too many paramaters were sent')
], (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(400).send(validationErrors.array());
        next();
    }
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
    if (!Object.keys(receiptsPointsMap).includes(id)) {
        res.status(404).send('No recepit found for that id');
    }
    let points = receiptsPointsMap[id];
    res.send({points: points});
});

module.exports = router;