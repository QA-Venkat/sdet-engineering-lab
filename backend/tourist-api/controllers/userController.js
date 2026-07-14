const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`),
);

//Route handlers for Users
/**
 * Get users
 */
exports.getUsers = (req, res) => {
  res.status(200).json({
    status: 'Success!',
    data: {
      users: users,
    },
  });
};
/**
 * GET USERS BY ID
 */
exports.getUserByID = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'Success!',
    data: {
      user,
    },
  });
};

/**
 * CREATE user
 */
exports.createUser = (req, res) => {
  const id = users[users.length - 1].id + 1;
  const newUser = { ...{ id: id }, ...req.body };
  users.push(newUser);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'Success!',
        data: {
          newUser,
        },
      });
    },
  );
};

/***
 * Update USER
 */
exports.updateUser = (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);
  if (!userIndex) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  const user = { ...users[userIndex], ...req.body };
  users[userIndex] = user;
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(200).json({
        status: 'Success!',
        data: {
          user,
        },
      });
    },
  );
};

/**
 * DELETE USER
 */
exports.deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID',
    });
  }
  users.splice(userIndex, 1);
  console.log(users);
  fs.writeFile(
    `${__dirname}/dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(204);
    },
  );
};
