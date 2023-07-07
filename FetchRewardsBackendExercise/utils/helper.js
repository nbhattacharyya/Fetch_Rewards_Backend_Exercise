const charSet = '0123456789abcdefghijklmnopqrstuvwxyz';

const namePoints = (retailer) => {
    let count = 0;
    for (let char of retailer) {
        if (char.match(/^[0-9a-zA-Z]+$/)) {
            count += 1;
        }
    }
    return count;
};
exports.namePoints = namePoints;

exports.totalAmountPoints = (total) => {
    let num = total % 1;
    if (num === 0) {
        return 75;
    }
    else {
        if (num % 0.25 == 0) {
            return 25;
        }
    }
    return 0;
};

exports.itemsLengthPoints = (items) => {
    return (5 * Math.floor((items.length / 2)));
}

exports.dayPurchasePoints = (purchaseDate) => {
    let day = purchaseDate.split('-')[2];
    if (day % 2 == 1) {
        return 6;
    }
    return 0;
}

exports.purchaseTimePoints = (purchaseTime) => {
    var twoPm = new Date();
    var fourPm = new Date();
    twoPm.setHours(14, 0);
    fourPm.setHours(16, 0);
    var purchaseTimeConverted = new Date();
    let parts = purchaseTime.split(':');
    purchaseTimeConverted.setHours(parts[0], parts[1]);
    if (purchaseTimeConverted.getTime() > twoPm.getTime() && purchaseTimeConverted.getTime() < fourPm.getTime()) {
        return 10;
    }
    return 0;
}

exports.itemDescriptions = (items) => {
    let total = 0;
    for (let item of items) {
        let newDescription = item.shortDescription.trim();
        if (newDescription.length % 3 == 0) {
            let newPrice = Math.ceil(parseFloat(item.price) * 0.2);
            total = total + newPrice;
        }
    }
    return total;
}

exports.generateId = () => {
    let result = '';
    let counter = 0;
    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            result += '-'
        }
        else {
            result += charSet[Math.floor(Math.random() * charSet.length)];
        }
    }
    return result;
}