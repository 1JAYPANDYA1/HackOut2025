import express from "express";
import session from "express-session";
import Redis from "ioredis";
import crypto from "crypto";
import cors from "cors";
import csurf from "csurf";
// import dotenv from `"dotenv";
import {REDIS_HOST,REDIS_PORT,REDIS_PASSWORD} from "./config/env.config.js";
import companyRoutes from "./routes/company.routes.js";
import helmet from "helmet";

// dotenv.config();
const app = express();
app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

const redisClient = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
})


app.use(
  session({
    secret: "supersecret123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, 
      maxAge: 1000 * 60 * 60,
    },
  })
);


app.use(csurf({ cookie: false }));

app.get("/csrf-token", (req, res) => {
  console.log("✅ Generated CSRF Token:", req.csrfToken());
  res.json({ csrfToken: req.csrfToken() });
});


const secretKey = "secretkey123";
function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey.padEnd(32)),
    iv
  );
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + ":" + encrypted;
}
function decrypt(text) {
  const [ivHex, encryptedText] = text.split(":");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey.padEnd(32)),
    Buffer.from(ivHex, "hex")
  );
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}


app.post("/login", async (req, res) => {
  const user = { id: "12345" };
  req.session.authenticated = true;

  req.session.save(async () => {
    const sessionId = req.sessionID;
    const encryptedUser = encrypt(JSON.stringify(user));
    await redisClient.set(sessionId, encryptedUser, "EX", 3600);
    res.json({ message: "Login success" });
  });
});

app.get("/me", async (req, res) => {
  if (!req.session.authenticated) {
    return res.status(401).json({ message: "Not logged in" });
  }
  const sessionId = req.sessionID;
  const encryptedUser = await redisClient.get(sessionId);
  if (!encryptedUser) {
    return res.status(401).json({ message: "Session expired" });
  }
  const decryptedUser = JSON.parse(decrypt(encryptedUser));
  res.json({ message: "Authenticated", user: decryptedUser });
});

app.use("/api/companies", companyRoutes);


app.post("/logout", async (req, res) => {
  const sessionId = req.sessionID;
  await redisClient.del(sessionId);

  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

app.listen(3000, () => console.log("✅ Server running on 3000"));