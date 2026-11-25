import "dotenv/config";
import mongoose from "mongoose";
import Case from "./models/Case.js";
import { casesData } from "./data/cases.js";

async function seedDatabase() {
  const uri = process.env.MONGO_URI;

  if (!uri || uri.includes("[DÁN_LINK_MONGODB")) {
    console.error(
      "[SEED ERROR] MONGO_URI chưa được cấu hình hợp lệ trong server/.env."
    );
    console.error(
      "Vui lòng dán chuỗi kết nối MongoDB Atlas (mongodb+srv://...) vào server/.env rồi chạy lại: npm run seed"
    );
    process.exit(1);
  }

  try {
    console.log("[SEED] Đang kết nối tới MongoDB Atlas...");
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log("[SEED] Kết nối MongoDB thành công.");

    const operations = casesData.map((caseItem) => ({
      updateOne: {
        filter: { slug: caseItem.slug },
        update: { $set: caseItem },
        upsert: true,
      },
    }));

    const result = await Case.bulkWrite(operations, { ordered: true });
    const totalCount = await Case.countDocuments();

    console.log(
      `[SEED] Hoàn tất nạp kịch bản EREBUS! Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}, Upserted: ${result.upsertedCount}`
    );
    console.log(`[SEED] Tổng số màn chơi hiện có trong MongoDB: ${totalCount}/20`);

    if (totalCount !== 20) {
      console.warn(
        `[SEED WARN] Dự kiến 20 màn chơi nhưng tìm thấy ${totalCount} bản ghi trong collection.`
      );
    }
  } catch (err) {
    console.error("[SEED ERROR] Nạp dữ liệu thất bại:", err.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("[SEED] Đã đóng kết nối MongoDB.");
    }
  }
}

seedDatabase();
