const express = require('express');
const { PORT } = require('./config');
const sequelize = require('./db');
const allRoutes = require('./routes');
const app = express();

app.use(express.json());
app.use('/', allRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log('server listening on port: ', PORT);
    });
  })
  .catch((e) => {
    console.log(e.stack);
    process.exit(0);
  });
