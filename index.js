const express = require('express');
const app = express();

const PORT = process.env.PORT || 8165;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./router/api'));

app.use((req, res, next) => {
    res.status(404).send({ error: '404 Not Found' });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: '500 Internal Server Error' });
});


app.get('/', (req, res) => {
    res.redirect('/api/help');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});