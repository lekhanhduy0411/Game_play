import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Case from "./models/Case.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

let isConnecting = false;
let lastDbError = null;

async function connectToDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri || uri.includes("[DÁN_LINK_MONGODB")) {
    lastDbError = "MONGO_URI chưa được cấu hình hợp lệ trong server/.env";
    return false;
  }

  if (mongoose.connection.readyState === 1) return true;
  if (isConnecting) return false;

  isConnecting = true;
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 12000,
    });
    lastDbError = null;
    console.log("[DB] Kết nối MongoDB Atlas thành công.");
    return true;
  } catch (err) {
    lastDbError = err.message;
    console.error("[DB] Kết nối MongoDB thất bại:", err.message);
    return false;
  } finally {
    isConnecting = false;
  }
}

async function ensureDatabaseReady() {
  if (mongoose.connection.readyState === 1) return true;
  return connectToDatabase();
}

// Parse comma-separated allowed origins from CLIENT_ORIGIN
const configuredOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultAllowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser tools (curl, Render health checks, Postman)
    if (!origin) return callback(null, true);

    const isExplicitlyAllowed =
      configuredOrigins.includes(origin) ||
      defaultAllowedOrigins.includes(origin);

    const isVercelPreview = /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(
      origin
    );

    if (isExplicitlyAllowed || isVercelPreview) {
      return callback(null, true);
    }

    return callback(new Error(`CORS policy blocked origin: ${origin}`), false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Health Check Endpoint (Render healthCheckPath)
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    dbState: mongoose.connection.readyState,
    dbError: mongoose.connection.readyState === 1 ? null : lastDbError,
    timestamp: new Date().toISOString(),
  });
});

// Get all 20 campaign cases sorted by order (answer is excluded via schema select: false & explicit projection)
app.get("/api/cases", async (req, res) => {
  try {
    const ready = await ensureDatabaseReady();
    if (!ready) {
      return res.status(503).json({
        error: "Cơ sở dữ liệu chưa sẵn sàng. Vui lòng thử lại sau giây lát.",
      });
    }

    const cases = await Case.find({})
      .select("-answer")
      .sort({ order: 1 })
      .lean();

    res.json(cases);
  } catch (err) {
    console.error("[GET /api/cases] Error:", err.message);
    res.status(500).json({ error: "Không thể tải danh sách hồ sơ vụ án." });
  }
});

// Verify player's submitted code against the hidden answer
app.post("/api/cases/:slug/verify", async (req, res) => {
  try {
    const ready = await ensureDatabaseReady();
    if (!ready) {
      return res.status(503).json({
        isCorrect: false,
        error: "Cơ sở dữ liệu chưa sẵn sàng. Vui lòng thử lại sau giây lát.",
      });
    }

    const { slug } = req.params;
    const { userAnswer } = req.body || {};

    if (typeof userAnswer !== "string") {
      return res.status(400).json({
        isCorrect: false,
        error: "Thiếu dữ liệu mật mã cần xác thực.",
      });
    }

    const foundCase = await Case.findOne({ slug }).select("+answer").lean();

    if (!foundCase) {
      return res.status(404).json({
        isCorrect: false,
        error: "Không tìm thấy hồ sơ màn chơi tương ứng.",
      });
    }

    const normalizedInput = userAnswer.trim().toUpperCase();
    const normalizedAnswer = String(foundCase.answer).trim().toUpperCase();
    const isCorrect = normalizedInput === normalizedAnswer;

    return res.json({ isCorrect });
  } catch (err) {
    console.error("[POST /api/cases/:slug/verify] Error:", err.message);
    return res.status(500).json({
      isCorrect: false,
      error: "Lỗi máy chủ khi xác thực mật mã.",
    });
  }
});

// Global error handler (including CORS rejections)
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err.message);
  res.status(err.message?.startsWith("CORS") ? 403 : 500).json({
    error: err.message || "Internal Server Error",
  });
});

async function startServer() {
  app.listen(PORT, () => {
    console.log(
      `[API] CYBER CODE-BREAKER Server đang lắng nghe tại http://localhost:${PORT}`
    );
  });

  const connected = await connectToDatabase();
  if (!connected) {
    const retryInterval = setInterval(async () => {
      if (mongoose.connection.readyState === 1) {
        clearInterval(retryInterval);
        return;
      }
      console.log("[DB] Đang thử kết nối lại MongoDB Atlas...");
      const ok = await connectToDatabase();
      if (ok) clearInterval(retryInterval);
    }, 5000);
  }
}

startServer();
