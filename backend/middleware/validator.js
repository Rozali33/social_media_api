
const { body, validationResult } = require('express-validator');
const User = require('../models/users.model');

const registrationRules = () => {
    return [
        body("email", "Email является обязательным")
          .trim()
          .escape()
          .isEmail()
          .withMessage("Email is required")
          .custom(async (email) => {
            return User.findOne({ email }).then((user) => {
              if (user) {
                return res.status(400).json("Пользователь с таким email уже существует");
              };
            });
          })
          .withMessage("Пользователь с таким email уже существует"),
        body("name", "Name является обязательным")
          .notEmpty()
          .trim()
          .escape(),
        body("lastname", "Lastname является обязательным")
          .notEmpty()
          .trim()
          .escape(),
        body("password", "password является обязательным")
          .notEmpty()
          .trim()
          .escape(),
        body("login", "login является обязательным")
          .notEmpty()
          .trim()
          .escape()
    ];
};
 
const validateRequests = (req, res, next) => {
    const errors = validationResult(req);
    const clientErrors = [];
        errors.array().map((err) => clientErrors.push({ message: err.msg }));
        if (clientErrors.length == 0) {
            return next();
        }
    return res.status(400).json({ clientErrors });
};

module.exports = {
    registrationRules,
    validateRequests,
};
