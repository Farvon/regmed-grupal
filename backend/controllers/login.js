const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/User');

//Verifica el usuario a logear
loginRouter.post('/', async (request, response) => {
  const { body } = request;
  const { username, password } = body;

  const user = await User.findOne({ username });

  const isEnabled = user === null ? false : user.enabled;

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!isEnabled) {
    return response.status(403).json({
      error: 'User disabled',
    });
  }

  if (!user || !passwordCorrect) {
    return response.status(401).json({
      error: 'Invalid user or password',
    });
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  response.send({
    name: user.name,
    username: user.username,
    token,
  });
});

module.exports = loginRouter;
