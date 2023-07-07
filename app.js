const express = require('express');
const app = express();
const PORT = 3000;
const processReceiptRoute = require('./routes/receipts.js');

app.use(express.json());
app.use('/receipts/process', processReceiptRoute);
app.use('/receipts/:id/points', processReceiptRoute);

app.get('/', (req, res) => {
    res.send('Server started succesfully!')
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
