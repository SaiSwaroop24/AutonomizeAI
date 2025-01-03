const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use('/api', routes);

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
});