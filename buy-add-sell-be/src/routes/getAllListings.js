import { db } from "../database";

export const getAllListingsRoute = {
  method: "GET",
  path: "/api/listings",
  handler: async (req, h) => {
    try {
      const rows = await db.query("SELECT * FROM listings");
      return h.response(rows.results).code(200);
    } catch (err) {
      console.error("Database query failed", err);
      return h.response({ error: "Internal Server Error" }).code(500);
    }
  },
};
