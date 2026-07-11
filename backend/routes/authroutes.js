const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("../config/passport");

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

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  async (req, res) => {
   // Existing user
if (!req.user.isNewUser) {

    const token = jwt.sign(
      {
        userId: req.user._id,
        orgId: req.user.organization._id,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.redirect(
      `http://localhost:5173/oauth-success?token=${token}`
    );
}
const tempToken = jwt.sign(
  {
    name: req.user.name,
    email: req.user.email,
    isNewUser: true,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "15m",
  }
);

return res.redirect(
  `http://localhost:5173/complete-profile?token=${tempToken}`
);
  }
);

router.post("/complete-profile", async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isNewUser) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const { orgName, role } = req.body;

    if (!orgName || !role) {
      return res.status(400).json({
        message: "Organization and role are required",
      });
    }

    let org = await Organization.findOne({
      name: orgName.toLowerCase(),
    });

    if (!org) {
      org = await Organization.create({
        name: orgName.toLowerCase(),
      });
    }

    const existingUser = await User.findOne({
      email: decoded.email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name: decoded.name,
      email: decoded.email,
      password: "",
      role,
      organization: org._id,
    });

    const finalToken = jwt.sign(
      {
        userId: user._id,
        orgId: org._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Registration complete",
      token: finalToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: org.name,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;