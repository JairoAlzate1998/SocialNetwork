const User = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Incomplete data");

  let existing = await User.findOne({ email: req.body.email });
  if (existing)
    return res
      .status(400)
      .send("Transaction rejects: the email already exists");

  let hash = await bcrypt.hash(req.body.password, 10);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });

  let result = await user.save();
  if (!result) return res.status(400).send("Error to register user");
  try {
    let jwt = user.generateJWT();
    return res.status(200).send({ jwt });
  } catch (e) {
    return res.status(400).send("Error to register user");
  }
};

const listUser = async (req, res) => {
    let user = await User.find({ name: RegExp(req.params["name"], "i") });
    if(!user || user.length === 0) return res.status(400).send("No users");
    return res.status(200).send({ user });
};

module.exports = { registerUser, listUser };
