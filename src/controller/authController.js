const md5 = require('md5');
const User = require('../model/User');
const register = async (req, res) => {
  const { username, password, email, role } = req.body;
  const hashPassword = md5(Number(password));
  const user = await User.create({
    username,
    password: hashPassword,
    email,
    role,
  });
  return res.status(200).json({
    message: 'Register successfully',
    data: user,
  });
};

module.exports = {
  register,
};
