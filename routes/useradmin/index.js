const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const Useradmin = require("../../models/Useradmin");
const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

//register
route.post(
  "/register",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Email is required")
        .not()
        .isEmpty(),
      check("email", "Email must follow email style").isEmail(),
      check("password", "Password is required")
        .not()
        .isEmpty(),
      check("password", "Password must be six charcter at least").isLength({
        min: 6
      })
    ]
  ],
  async (req, res) => {
    const { name, email, password, access, phone, logs } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ message: errors.array() });
    }

    try {
      const useradmin = await Useradmin.findOne({ email });
      if (useradmin) {
        return res.status(400).json({ message: "Email already exist" });
      }

      const newUseradmin = new Useradmin({
        name,
        password,
        email,
        phone,
        access,
        logs
      });

      const salt = await bcryptJs.genSalt(10);
      newUseradmin.password = await bcryptJs.hash(password, salt);
      const admin = await newUseradmin.save();
      res.json(admin);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" + error });
    }
  }
);

//login

route.post("/login", async (req, res) => {
  const useradmin = {
    id: 1,
    name: "amir azarbshi",
    email: "amirm.azarbashi@gmail.com",
    password: "123456"
  };

  const token = await jwt.sign({ user: useradmin.id }, config.get("secretKey"));
  res.json({ token });
});

route.post("/auth", auth, (req, res) => {
  res.json({ message: "user is authenticated" });
});

module.exports = route;
