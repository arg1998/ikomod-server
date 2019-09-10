const server = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userRoutes = require('./API/v1/routes/User.route');
const config = require('./configs/configs');

server.use(morgan('dev'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1:27017/ikomod', {
  useNewUrlParser: true
});

server.use('/api/v1', userRoutes);

server.get('/ping', async (req, res) => {
  res.status(200).send({ response: 'pong' });
});

server.listen(config.PORT, () => {
  console.log('server running at port ', config.PORT);
});
