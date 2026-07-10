const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/usermodal");
const Organization = require("../models/orgmodel");
const {
    registerSchema,
    loginSchema
} = require("../validators/authvalidator");

const router = express.Router();

// SIGNUP
router.post("/register", async (req, res,next) => {
  try {
    const validated = registerSchema.parse(req.body);
    const {name,email,password,orgName,role}=validated;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let org = await Organization.findOne({ name: orgName.toLowerCase() });

    if (!org) {
      org = await Organization.create({ name: orgName.toLowerCase() });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "manager",
      organization: org._id
    });

    const token = jwt.sign(
      {
        userId: user._id,
        orgId: org._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: org.name
      }
    });

  } catch (err) {
    if(err.name==="ZodError"){
return res.status(400).json({
message:err.errors
});
}
if (err.code === 11000) {
    return res.status(400).json({
        message: "Email already exists"
    });
}
    next(err);
  }
});

// LOGIN
router.post("/login", async (req, res,next) => {
  try {
    const validated = loginSchema.parse(req.body);
    const {email,password}=validated;
    
    const user = await User.findOne({ email: email.toLowerCase() }).populate("organization", "name");

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        orgId: user.organization._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization.name
      }
    });

  } catch (err) {
    if(err.name==="ZodError"){
return res.status(400).json({
message:err.errors
});
}
if (err.code === 11000) {
    return res.status(400).json({
        message: "Email already exists"
    });
}
    next(err);
  }
});

module.exports = router;