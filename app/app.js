const express = require('express');
const app = express();
const port = 5000;
const weatherRoute = require('./routes/api/weather');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('PORT 5000');
});

app.use('/api', weatherRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));