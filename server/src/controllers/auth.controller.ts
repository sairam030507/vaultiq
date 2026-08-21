import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "vaultiq-super-secret-key-2026";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  currency: string;
}

// In-memory demo user store
const users: UserRecord[] = [
  {
    id: "user-demo-1",
    name: "Alex Morgan",
    email: "demo@vaultiq.ai",
    passwordHash: bcrypt.hashSync("demo1234", 10),
    currency: "INR",
  },
];

export const register = (req: Request, res: Response): void => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ success: false, message: "Name, email, and password are required" });
      return;
    }

    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      res.status(400).json({ success: false, message: "User with this email already exists" });
      return;
    }

    const newUser: UserRecord = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      passwordHash: bcrypt.hashSync(password, 10),
      currency: "INR",
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, currency: newUser.currency },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error registering user", error });
  }
};

export const login = (req: Request, res: Response): void => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: "Email and password are required" });
      return;
    }

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // For convenience during demo/testing: auto-create demo user or accept credentials
      const newUser: UserRecord = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0] || "User",
        email: email.toLowerCase(),
        passwordHash: bcrypt.hashSync(password, 10),
        currency: "INR",
      };
      users.push(newUser);

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, name: newUser.name },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Welcome to VaultIQ!",
        data: {
          token,
          user: { id: newUser.id, name: newUser.name, email: newUser.email, currency: newUser.currency },
        },
      });
      return;
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: { id: user.id, name: user.name, email: user.email, currency: user.currency },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error logging in", error });
  }
};

export const getProfile = (req: Request, res: Response): void => {
  res.json({
    success: true,
    data: {
      id: "user-demo-1",
      name: "Alex Morgan",
      email: "demo@vaultiq.ai",
      currency: "INR",
      monthlyBudget: 60000,
      monthlyIncome: 75000,
    },
  });
};
