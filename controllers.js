const User = require('/models/User');
const SwapRequest = require('/models/SwapRequest');

export const signup = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
};

export const getUsers = async (_req, res) => {
  const users = await User.find();
  res.json(users);
};

export const createSwap = async (req, res) => {
  const swap = new SwapRequest(req.body);
  await swap.save();
  res.status(201).json(swap);
};
