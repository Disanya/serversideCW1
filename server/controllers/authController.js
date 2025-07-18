const db = require("../db/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//registering a new user to the website
exports.register = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.status(400).json({ error: "Passwords do not match" });

  const hashed = await bcrypt.hash(password, 10);
  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, hashed],
    function (err) {
      if (err)
        return res.status(400).json({ error: "Username already exists" });
      return res.status(201).json({ message: "User registered, please login" });
    }
  );
};

//an existing user login to the website
exports.login = (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    async (err, user) => {
      if (err || !user)
        return res.status(400).json({ error: "Invalid credentials" });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    }
  );
};
