const express = require('express');
const dbConnect = require('./dbConnect');
const app = express();
app.use(express.json());

const userRoute = require('./routes/userRoute');
const transactionsRoute = require('./routes/transactionsRoute');
const groupRoute = require('./routes/groupRoute');
const adminRoute = require('./routes/adminRoute'); // Ensure this line is added

app.use('/api/users', userRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/groups', groupRoute);
app.use('/api/admin', adminRoute); // Ensure this line is added

const port = 4500;
app.get('/', (req, res) => res.send("Hello world"));

app.listen(port, () => console.log(`Listening to port ${port}`));
